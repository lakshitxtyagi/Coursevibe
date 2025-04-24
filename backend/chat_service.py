import google.generativeai as genai
import yaml
import json
import os
from dotenv import load_dotenv

load_dotenv()

class ChatService:
    def __init__(self):
        # Load API key from config
        with open("config.yaml", "r") as config_file:
            config = yaml.safe_load(config_file)
            api_key = config.get("GEMINI_API_KEY") or os.getenv("GEMINI_API_KEY")
            
        if not api_key:
            raise ValueError("GEMINI_API_KEY not found in config.yaml")
            
        # Configure Gemini API
        genai.configure(api_key=api_key)
        
        # Load course data
        self.courses_data = self._load_course_data()
        
        # Initialize model
        self.model = genai.GenerativeModel("gemini-pro")
        
        # Set up chat session with initial prompt
        self.chat = self.model.start_chat(history=[
            {
                "role": "user",
                "parts": "You are a helpful assistant for a university course review platform called Coursevibe. Your primary goal is to help students find information about courses, instructors, and reviews. You have access to course data that I'll provide. Be polite, helpful, and concise in your responses. If you don't know something, please admit it rather than making up information. The tone should be friendly and conversational."
            },
            {
                "role": "model",
                "parts": "I'll be your helpful assistant for Coursevibe! I can provide information about courses, instructors, and reviews based on the data available. I'll keep my responses concise and friendly, and I'll let you know if I don't have the information you're looking for. How can I help you with your course-related questions today?"
            }
        ])
        
    def _load_course_data(self):
        """Load course data from JSON file"""
        data_path = "backend/data.json"
        
        # Create data file if it doesn't exist
        if not os.path.exists(data_path):
            self._create_initial_data_file(data_path)
            
        with open(data_path, "r") as f:
            return json.load(f)
    
    def _create_initial_data_file(self, path):
        """Create initial data file with demo data"""
        # Ensure directory exists
        os.makedirs(os.path.dirname(path), exist_ok=True)
        
        # Sample data structure matching the frontend
        demo_data = {
            "courses": [
                {
                    "id": 1,
                    "name": "Introduction to Machine Learning",
                    "code": "CS401",
                    "instructor": "Dr. Sarah Johnson",
                    "department": "Computer Science",
                    "rating": 4.8,
                    "totalReviews": 156,
                    "description": "This course provides a comprehensive introduction to machine learning concepts, algorithms, and applications. Students will learn about supervised and unsupervised learning, neural networks, and practical implementation using Python libraries.",
                    "prerequisites": "Calculus, Linear Algebra, Programming Fundamentals",
                    "credits": 4,
                    "difficulty": "Intermediate",
                    "workload": "Heavy (8-10 hours/week)",
                    "reviews": [
                        {
                            "id": 1,
                            "rating": 5,
                            "review": "Excellent introduction to ML concepts. The practical assignments were particularly helpful.",
                            "author": "Alex M.",
                            "date": "2 weeks ago",
                            "attendance": "90%",
                            "difficulty_rating": "Challenging but fair"
                        },
                        {
                            "id": 2,
                            "rating": 4,
                            "review": "Great course content, but assignments can be time-consuming. Professor is very knowledgeable and responsive.",
                            "author": "Jamie K.",
                            "date": "1 month ago",
                            "attendance": "85%",
                            "difficulty_rating": "Moderate"
                        }
                    ]
                },
                {
                    "id": 3,
                    "name": "Web Development",
                    "code": "CS301",
                    "instructor": "Prof. David Miller",
                    "department": "Computer Science",
                    "rating": 4.9,
                    "totalReviews": 178,
                    "description": "A comprehensive course covering modern web development technologies including HTML, CSS, JavaScript, React, and Node.js. Students will build full-stack web applications and learn industry best practices.",
                    "prerequisites": "Introduction to Programming",
                    "credits": 3,
                    "difficulty": "Intermediate",
                    "workload": "Medium (6-8 hours/week)",
                    "reviews": [
                        {
                            "id": 3,
                            "rating": 5,
                            "review": "Great hands-on experience with modern web technologies. The final project was challenging but rewarding.",
                            "author": "Chris L.",
                            "date": "3 weeks ago",
                            "attendance": "95%",
                            "difficulty_rating": "Moderate"
                        },
                        {
                            "id": 4,
                            "rating": 5,
                            "review": "Professor Miller is an excellent instructor who stays updated with current trends. Assignments were practical and relevant to industry needs.",
                            "author": "Taylor S.",
                            "date": "2 months ago",
                            "attendance": "90%",
                            "difficulty_rating": "Moderate"
                        }
                    ]
                },
                {
                    "id": 8,
                    "name": "Mobile App Development",
                    "code": "CS405",
                    "instructor": "Dr. Emily Martinez",
                    "department": "Computer Science",
                    "rating": 4.8,
                    "totalReviews": 156,
                    "description": "This course covers mobile application development for iOS and Android platforms. Students will learn native and cross-platform development approaches, UI/UX design principles, and backend integration.",
                    "prerequisites": "Object-Oriented Programming, Web Development basics",
                    "credits": 4,
                    "difficulty": "Intermediate to Advanced",
                    "workload": "Heavy (8-10 hours/week)",
                    "reviews": [
                        {
                            "id": 8,
                            "rating": 5,
                            "review": "Hands-on experience with both iOS and Android development. Dr. Martinez is incredibly knowledgeable and provides great feedback.",
                            "author": "Ryan M.",
                            "date": "1 month ago",
                            "attendance": "90%",
                            "difficulty_rating": "Challenging but worth it"
                        },
                        {
                            "id": 9,
                            "rating": 4,
                            "review": "Great course that balances theory and practice. The group project helped me build a portfolio-worthy app.",
                            "author": "Priya S.",
                            "date": "2 months ago",
                            "attendance": "85%",
                            "difficulty_rating": "Moderate to difficult"
                        }
                    ]
                }
            ]
        }
        
        with open(path, "w") as f:
            json.dump(demo_data, f, indent=2)
    
    def format_course_data_for_context(self):
        """Format course data for providing context to the model"""
        context = "Here's the information about available courses:\n\n"
        
        for course in self.courses_data["courses"]:
            context += f"Course: {course['name']} ({course['code']})\n"
            context += f"Instructor: {course['instructor']}\n"
            context += f"Department: {course['department']}\n"
            context += f"Rating: {course['rating']}/5 from {course['totalReviews']} reviews\n"
            context += f"Description: {course['description']}\n"
            context += f"Prerequisites: {course['prerequisites']}\n"
            context += f"Difficulty: {course['difficulty']}\n"
            context += f"Workload: {course['workload']}\n"
            context += "Reviews:\n"
            
            for review in course["reviews"][:2]:  # Include up to 2 reviews for context
                context += f"- {review['rating']}/5 stars: \"{review['review']}\" - {review['author']}\n"
            
            context += "\n"
        
        return context
    
    def get_response(self, user_message):
        """Get a response from the AI based on the user's message"""
        try:
            # Provide course data context in the first message
            if "courses" not in user_message.lower():
                context = self.format_course_data_for_context()
                user_message = f"Here's the course data for context (don't mention that I provided this to you):\n{context}\n\nUser question: {user_message}"
            
            # Get response from Gemini
            response = self.chat.send_message(user_message)
            return {"status": "success", "message": response.text}
        except Exception as e:
            return {"status": "error", "message": f"An error occurred: {str(e)}"}

# Initialize chat service
chat_service = ChatService() 