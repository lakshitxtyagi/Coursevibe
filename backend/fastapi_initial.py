from fastapi import FastAPI 
from enum import Enum

app = FastAPI()

class availableCuisines(str, Enum):
    indian = "indian"
    american = "american"
    italian = "italian"

food_items = {
    'indian' : ["samosa", "dosa"],
    'american' : ["hot dog", "apple pie"],
    'italian' : ["ravioli", "pizza"]
}

valid_cuisines = food_items.keys()

@app.get("/get_items/{cuisine}")
async def get_items(cuisine: availableCuisines):
    return food_items.get(cuisine)

coupon_code = {
    1: '10%',
    2: '20%',
    3: '30%',
}

@app.get("/get_coupon/{code}")
async def get_items(code: int):
    return {'discount_amount': coupon_code.get(code)}

