from fastapi import FastAPI, BackgroundTasks, Form, HTTPException,WebSocket, WebSocketDisconnect, Depends,Query,File, UploadFile
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from fastapi.responses import JSONResponse
import os
from fastapi.responses import FileResponse
import sqlite3
import random
import datetime

from utils.email import send_email
from typing import List, Dict,Optional
from fastapi.middleware.cors import CORSMiddleware
from utils.regestration import create_jwt_token
from pydantic import BaseModel
import json
import shutil



#setup 

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



#variables


DATABASE = "database.db"
folders_data_path = "C:/Users/Ritin/OneDrive/Desktop/myproject/datadoc/data/foldersdata"


class QnAMessage(BaseModel):
    id: int
    question: str
    answer: str
    foldername: Optional[str]
    filename: Optional[str]
    timestamp: str

class File_pydentic(BaseModel):
    file_id: int
    filename: str

class Folder_pydentic(BaseModel):
    folder_id: int
    foldername: str
    files: List[File_pydentic]



class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, email: str):
        await websocket.accept()
        if email not in self.active_connections:
            self.active_connections[email] = []
        self.active_connections[email].append(websocket)

    def disconnect(self, websocket: WebSocket, email: str):
        self.active_connections[email].remove(websocket)
        if not self.active_connections[email]:
            del self.active_connections[email]

    async def send_personal_message(self, message: str, email: str):
        for connection in self.active_connections.get(email, []):
            await connection.send_text(message)

    async def broadcast(self, message: str):
        for connections in self.active_connections.values():
            for connection in connections:
                await connection.send_text(message)

manager = ConnectionManager()


#apis 

@app.post("/validate_user/")
async def validate_user(email: str = Form(...), username: str = Form(...), password: str = Form(...)):
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        # Generate OTP and timestamp
        otp = random.randint(100000, 999999)
        timestamp = datetime.datetime.now().isoformat()

        # Delete any existing entry for this email
        cursor.execute("DELETE FROM user_validation WHERE email = ?", (email,))

        # Insert new entry
        cursor.execute("INSERT INTO user_validation (email, username, password, otp, timestamp) VALUES (?, ?, ?, ?, ?)", 
                    (email, username, password, otp, timestamp))

        conn.commit()
        conn.close()
        await send_email(email ,otp )
        
        return JSONResponse(status_code=201 , content={"message":"Otp sent successfully."})
    
    except Exception as e:
        return JSONResponse(status_code=400 , content={"message":"Validate credentials"}) 


@app.post("/register_user/")
async def register_user(email: str = Form(...), otp: int = Form(...)):
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        # Retrieve entry from user_validation table
        cursor.execute("SELECT * FROM user_validation WHERE email = ?", (email,))
        entry = cursor.fetchone()

        if not entry:
            raise HTTPException(status_code=404, detail="User validation entry not found")

        stored_otp = entry[3]  # Assuming the OTP column is at index 3
        timestamp_str = entry[4]  # Assuming the timestamp column is at index 4
        stored_timestamp = datetime.datetime.fromisoformat(timestamp_str)
        
        if otp == stored_otp:
            current_time = datetime.datetime.now()
            time_difference = current_time - stored_timestamp
            
            if time_difference <= datetime.timedelta(minutes=20):
                # Insert into users table
                token = create_jwt_token(entry[0])
                cursor.execute("INSERT INTO users (email, username, password, token) VALUES (?, ?, ?, ?)",
                               (entry[0], entry[1], entry[2], token))
                conn.commit()
                print(token)
                # Delete entry from user_validation table
                cursor.execute("DELETE FROM user_validation WHERE email = ?", (email,))
                conn.commit()
                conn.close()

                return JSONResponse(status_code=201, content={"message": "User registered successfully"})

            else:
                raise HTTPException(status_code=400, detail="OTP expired")
        else:
            raise HTTPException(status_code=400, detail="Invalid OTP")

    except HTTPException as e:
        raise HTTPException(status_code=400 , detail="Server error ")

    except Exception as e:
        return HTTPException(status_code=400 , detail="Server error ")



@app.get("/get-pdf/")
async def get_pdf(file_id: int , folder_id: int , email : str):

    cursor.execute('''SELECT foldername_fs FROM folders WHERE folder_id = ?''', (folder_id,))
    folder = cursor.fetchone()

    if not folder:
        conn.close()
        raise HTTPException(status_code=404, detail="Folder not found")
    
    foldername_fs = folder[0]
    
    # Fetch filename_fs from the files table
    cursor.execute('''SELECT filename_fs FROM files WHERE file_id = ? AND folder_id = ?''', (file_id, folder_id))
    file = cursor.fetchone()
    
    if not file:
        conn.close()
        raise HTTPException(status_code=404, detail="File not found")

    filename_fs = file[0]
    
    # Construct the file path and check if it exists
    file_path = os.path.join(folders_data_path, email, foldername_fs, filename_fs)

    if os.path.exists(file_path) and file_path.endswith(".pdf"):
        return FileResponse(file_path, media_type='application/pdf', filename="abc.pdf")
    else:
        raise HTTPException(status_code=404, detail="PDF not found")


@app.get("/api/video")
def get_video(name: str):
    # Replace with your actual path to videos
    # video_path = f"videos/{name}.mp4"
    video_path = "C:/Users/Ritin/OneDrive/Pictures/Screenshots/test.mp4"
    return FileResponse(video_path)



@app.websocket("/ws/{email}")
async def websocket_endpoint(websocket: WebSocket, email: str):
    await manager.connect(websocket, email)
    try:
        while True:
            await websocket.receive_text()  # Keep the connection alive
    except WebSocketDisconnect:
        manager.disconnect(websocket, email)

@app.post("/send-qna-message/")
async def send_qna_message(email: str = Form(...)):
    if email in manager.active_connections:
        # Define a dummy QnAMessage
        time = datetime.datetime.now()
        dummy_qna_message = QnAMessage(
            id=1,
            question='Question:' + str(time),
            answer='answer' + str(time),
            foldername='Folder 1',
            filename=None,
            timestamp='12/07/2000 12:30 pm'
        )

        # Prepare the response to be sent
        response = {
            "type": "qna_message",
            "content": dummy_qna_message.dict()
        }

        # Send the message to the connected WebSocket
        await manager.send_personal_message(json.dumps(response), email)
        return {"message": "QnA message sent"}
    else:
        raise HTTPException(status_code=404, detail="Email not connected")




conn = sqlite3.connect('database.db')
cursor = conn.cursor()

from docx import Document
from fpdf import FPDF
import uuid

@app.post("/new_folder")
async def new_folder(
    email: str = Form(...),
    foldername: str = Form(...),
    files: List[UploadFile] = File(...)
):
    # Check if a folder with the same name as email exists, create if not
    user_folder = os.path.join(folders_data_path, email)
    
    if not os.path.exists(user_folder):
        os.makedirs(user_folder)

    # Create a unique 100-character folder name
    unique_foldername = str(uuid.uuid4().hex)[:100]
    folder_path = os.path.join(user_folder,unique_foldername)
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)


    cursor.execute('''INSERT INTO folders (user_id, foldername_user, foldername_fs, folder_type)
                      VALUES (?, ?, ?, ?)''', (email, foldername, unique_foldername, 'file'))
    folder_id = cursor.lastrowid
    conn.commit()

    new_folder_websocket_message = Folder_pydentic(
        folder_id=folder_id,
        foldername=foldername,
        files=[]
    )


    for file in files:
        file_extension = file.filename.split(".")[-1]
        file_base_name = file.filename.split(".")[0]
        unique_filename = f"{file_base_name}   {uuid.uuid4().hex[:50]}.pdf"
        orignal_name = file.filename
        if file_extension in ["docx", "txt"]:
            pdf_location = os.path.join(folder_path, unique_filename)
            orignal_name  = file_base_name + ".pdf"
            if file_extension == "docx":
                doc = Document(file.file)
                doc.save("temp.docx")

                pdf = FPDF()
                pdf.add_page()
                pdf.set_auto_page_break(auto=True, margin=15)
                pdf.set_font("Arial", size=12)
                for para in doc.paragraphs:
                    pdf.multi_cell(0, 10, para.text)
                pdf.output(pdf_location)
                os.remove("temp.docx")

            elif file_extension == "txt":
                with open("temp.txt", "w") as temp_txt:
                    temp_txt.write(file.file.read().decode("utf-8"))

                pdf = FPDF()
                pdf.add_page()
                pdf.set_auto_page_break(auto=True, margin=15)
                pdf.set_font("Arial", size=12)
                with open("temp.txt", "r") as temp_txt:
                    for line in temp_txt:
                        pdf.multi_cell(0, 10, line)
                pdf.output(pdf_location)
                os.remove("temp.txt")
        
        else:
            pdf_location = os.path.join(folder_path, unique_filename)
            with open(pdf_location, "wb") as f:
                shutil.copyfileobj(file.file, f)

        # Insert into files table
        cursor.execute('''INSERT INTO files (folder_id, filename_user, filename_fs)
                          VALUES (?, ?, ?)''', (folder_id,orignal_name , unique_filename))
        file_id = cursor.lastrowid
        new_folder_websocket_message.files.append(File_pydentic(file_id=file_id, filename=orignal_name))
        conn.commit()

    response = {
            "type": "new_folder_websocket_message",
            "content": new_folder_websocket_message.dict()
        }

        # Send the message to the connected WebSocket
    await manager.send_personal_message(json.dumps(response), email)
    return {"message": "files uploaded"}


def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn




@app.get("/get_folders")
async def get_folders(email: str = Query(...)):
    conn = get_db_connection()
    cursor = conn.cursor()

    # Get all folders for the user
    cursor.execute('''SELECT folder_id, foldername_user FROM folders WHERE user_id = ?''', (email,))
    folders = cursor.fetchall()

    if not folders:
        return []

    # Construct the response structure
    response = []
    for folder in folders:
        folder_id = folder[0]
        foldername = folder[1]
        
        # Get all files for the folder
        cursor.execute('''SELECT  file_id, filename_user FROM files WHERE folder_id = ?''', (folder_id,))
        files = cursor.fetchall()

        file_list = [{'file_id': file[0], 'filename': file[1]} for file in files]
        
        response.append({
            'folder_id': folder_id,
            'foldername': foldername,
            'files': file_list
        })

    conn.close()
    return response






#temporary apis 



@app.get("/get-pdf-temp/")
async def get_pdf(filename: str):

    file_path = "C:/Users/Ritin/Downloads/pdfcoffee.com_ocean-a-visual-encyclopedia-5-pdf-free-pages-3.pdf"
    if os.path.exists(file_path) and file_path.endswith(".pdf"):
        return FileResponse(file_path, media_type='application/pdf', filename="abc.pdf")
    else:
        raise HTTPException(status_code=404, detail="PDF not found")