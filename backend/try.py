from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from supabase import create_client, Client
import os
from dotenv import load_dotenv
import jwt

load_dotenv()

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

# User Signup Endpoint
@app.post("/signup")
def signup(email: str, password: str):
    response = supabase.auth.sign_up({"email": email, "password": password})
    if "error" in response:
        raise HTTPException(status_code=400, detail=response["error"]["message"])
    return {"message": "Signup successful", "user": response["user"]}

# User Login Endpoint
@app.post("/login")
def login(email: str, password: str):
    response = supabase.auth.sign_in_with_password({"email": email, "password": password})
    if "error" in response:
        raise HTTPException(status_code=400, detail=response["error"]["message"])
    return {"access_token": response["session"]["access_token"]}

# Protected Route Example
@app.get("/profile")
def profile(user_id: str = Depends(get_current_user)):
    return {"message": "User profile", "user_id": user_id}