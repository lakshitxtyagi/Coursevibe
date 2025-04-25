from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from typing import List, Optional
import json
import jwt
import sqlite3
from datetime import datetime, timedelta
from supabase import create_client
import uvicorn
from chat_service import chat_service

SUPABASE_URL = "https://isafwfgmkrjfnnihhdxt.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzYWZ3Zmdta3JqZm5uaWhoZHh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0MTk2NzEsImV4cCI6MjA1ODk5NTY3MX0.t-Vw3OEgh5D3DOle6nN1vCluMjxX87tqDRG8UXtPEz8"

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Example query
response = supabase.table("institutes").select("*").execute()
print(response.data)

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to specific frontend origin in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Try to load courses from data.json if it exists
try:
    with open("backend/data.json", "r") as f:
        data = json.load(f)
        courses = [
            {"id": course["id"], "name": f"{course['name']} ({course['code']})"}
            for course in data["courses"]
        ]
except (FileNotFoundError, json.JSONDecodeError):
    # Fallback to dummy data
    courses = [
        {"id": 1, "name": "Machine Learning (CS401)"},
        {"id": 2, "name": "Data Structures (CS201)"},
        {"id": 3, "name": "Algorithms (CS301)"},
    ]

reviews_db = []  # List to store reviews

# New chat message model
class ChatMessage(BaseModel):
    message: str

# Pydantic model for review submission
class Review(BaseModel):
    courseCode: str
    rating: int
    review: str
    author: str
    date: str

# Secret key for JWT tokens
SECRET_KEY = "your-secret-key-keep-it-safe"
ALGORITHM = "HS256"

# Dummy users database
users_db = {
    "john.doe@example.com": {
        "email": "john.doe@example.com",
        "password": "password123",  # In production, store hashed passwords
        "name": "John Doe",
        "initials": "JD",
        "role": "student",
        "department": "Computer Science",
        "semester": 4
    }
}

class LoginRequest(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(hours=24)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@app.post("/login", response_model=Token)
async def login(request: LoginRequest):
    user = users_db.get(request.email)
    if not user or user["password"] != request.password:
        raise HTTPException(
            status_code=401,
            detail="Incorrect email or password"
        )
    
    access_token = create_access_token({"sub": user["email"]})
    return {"access_token": access_token, "token_type": "bearer"}

# Dependency to get current user
async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return users_db[email]
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except (jwt.JWTError, KeyError):
        raise HTTPException(status_code=401, detail="Could not validate credentials")

# Protected route example
@app.get("/me")
async def read_users_me(current_user = Depends(get_current_user)):
    return current_user

@app.get("/courses")
async def get_courses():
    return courses

# New endpoint for course details
@app.get("/courses/{course_id}")
async def get_course(course_id: int):
    try:
        with open("backend/data.json", "r") as f:
            data = json.load(f)
            for course in data["courses"]:
                if course["id"] == course_id:
                    return course
            raise HTTPException(status_code=404, detail="Course not found")
    except (FileNotFoundError, json.JSONDecodeError):
        raise HTTPException(status_code=500, detail="Error reading course data")

@app.post("/reviews/add")
async def add_review(review: Review):
    
    reviews_db.append(review.dict())
    
    return {"message": "Review added successfully", "review": review}

@app.get("/reviews", response_model=List[Review])
async def get_reviews():
    return reviews_db

# New chat endpoint
@app.post("/chat")
async def chat(message: ChatMessage):
    return chat_service.get_response(message.message)

# Add to your existing models
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

@app.post("/signup")
async def signup(request: SignUpRequest):
    if request.email in users_db:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )
        
    
    # Create new user
    new_user = {
        "email": request.email,
        "password": request.password,  # In production, hash the password
        "name": request.name,
        "initials": "".join(word[0].upper() for word in request.name.split()),
        "role": "student",
        "department": request.department,
        "semester": request.semester,
        "studentId": request.studentId,
        "major": request.major,
        "minor": request.minor,
        "graduationYear": request.graduationYear
    }
    
    users_db[request.email] = new_user
    
    # Create and return token
    access_token = create_access_token({"sub": request.email})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": new_user
    }

def get_db_connection():
    conn = sqlite3.connect("backend/database/database.db")
    conn.row_factory = sqlite3.Row  # Allows dictionary-like access to rows
    return conn

if __name__=="__main__":
    uvicorn.run(app, port=8000, host="0.0.0.0")