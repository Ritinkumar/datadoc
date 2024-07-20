from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from fastapi import HTTPException

conf = ConnectionConfig(
    MAIL_USERNAME="ritin.kumar@mtree.co.in",
    MAIL_PASSWORD="Nahipata47?",
    MAIL_FROM="ritin.kumar@mtree.co.in",
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_STARTTLS = True,
    MAIL_SSL_TLS = False,
    USE_CREDENTIALS = True,
    VALIDATE_CERTS = True
)

async def send_email( email , otp):
    try:
        message = MessageSchema(
            subject=f"registration on Data doc ",
            recipients=[email],
            body=f"<p>Otp for registration on Data doc is {otp}.</p>",
            subtype=MessageType.html
        )

        fm = FastMail(conf)
        await fm.send_message(message)
    except Exception as e: 
        raise  HTTPException(status_code=400 , detail="error while sending mail ")
