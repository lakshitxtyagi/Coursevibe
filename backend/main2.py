from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from typing import List, Optional
from supabase import create_client, Client
import os
from dotenv import load_dotenv
import jwt

load_dotenv()

# Initialize Supabase client
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Authentication Helper Function
def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        decoded_token = jwt.decode(token, options={"verify_signature": False})
        user_id = decoded_token.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid authentication token")
        return user_id
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# Model for Course
class Course(BaseModel):
    id: int
    name: str
    department: str
    credits: int
    description: str

# Model for Review
class Review(BaseModel):
    course_id: int
    student_id: str
    rating: int
    comment: str

# Model for User Signup
class SignUpRequest(BaseModel):
    name: str
    email: str
    password: str
    department: str
    semester: str
    studentId: str
    major: str
    minor: Optional[str] = None
    graduationYear: str

# Get Courses from Supabase
@app.get("/courses", response_model=List[Course])
async def get_courses():
    response = supabase.table("courses").select("*").execute()
    if response.error:
        raise HTTPException(status_code=500, detail="Failed to fetch courses")
    return response.data

# Add a Review
@app.post("/reviews/add")
async def add_review(review: Review):
    response = supabase.table("reviews").insert(review.dict()).execute()
    if response.error:
        raise HTTPException(status_code=500, detail="Failed to add review")
    return {"message": "Review added successfully", "review": review}

# Get All Reviews
@app.get("/reviews", response_model=List[Review])
async def get_reviews():
    response = supabase.table("reviews").select("*").execute()
    if response.error:
        raise HTTPException(status_code=500, detail="Failed to fetch reviews")
    return response.data

# User Signup
@app.post("/signup")
async def signup(request: SignUpRequest):
    response = supabase.auth.sign_up({"email": request.email, "password": request.password})
    if "error" in response:
        raise HTTPException(status_code=400, detail=response["error"]["message"])

    # Insert user details into the users table
    user_data = request.dict()
    user_data["user_id"] = response["user"]["id"]

    user_insert_response = supabase.table("users").insert(user_data).execute()
    if user_insert_response.error:
        raise HTTPException(status_code=500, detail="Failed to store user details")

    return {"message": "Signup successful", "user": response["user"]}

# User Login
@app.post("/login")
async def login(email: str, password: str):
    response = supabase.auth.sign_in_with_password({"email": email, "password": password})
    if "error" in response:
        raise HTTPException(status_code=400, detail=response["error"]["message"])
    return {"access_token": response["session"]["access_token"]}

# Get User Profile
@app.get("/profile")
async def profile(user_id: str = Depends(get_current_user)):
    response = supabase.table("users").select("*").eq("user_id", user_id).single().execute()
    if response.error:
        raise HTTPException(status_code=500, detail="Failed to fetch profile")
    return response.data
