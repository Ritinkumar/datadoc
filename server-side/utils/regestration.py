import datetime
import jwt
from fastapi import HTTPException
SECRET_KEY = "YP3kD4B_g6c9ADm2E-CAg04Ci9GbgUlWH49r9M5whF8"  

# Helper function to generate JWT token
def create_jwt_token(email):
    try:
        payload = {
            "email": email,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1)
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
        return token
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail="Error while creating token")

