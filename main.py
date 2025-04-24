from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import json
import os

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Data Models
class Review(BaseModel):
    courseCode: str
    rating: int
    review: str
    author: str
    date: str

# In-memory storage (replace with database in production)
reviews_db = {}

# Load initial reviews from a JSON file
try:
    with open('reviews.json', 'r') as f:
        reviews_db = json.load(f)
except FileNotFoundError:
    reviews_db = {}

@app.post("/reviews/add")
async def add_review(review: Review):
    if review.courseCode not in reviews_db:
        reviews_db[review.courseCode] = []
    
    reviews_db[review.courseCode].append(review.dict())
    
    # Save to JSON file (replace with database in production)
    with open('reviews.json', 'w') as f:
        json.dump(reviews_db, f)
    
    return {"message": "Review added successfully"}

@app.get("/reviews/{course_code}")
async def get_course_reviews(course_code: str):
    if course_code not in reviews_db:
        return {"reviews": []}
    return {"reviews": reviews_db[course_code]}

# Optional: Get all reviews
@app.get("/reviews")
async def get_all_reviews():
    return reviews_db 