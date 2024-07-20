import sqlite3

# Connect to the SQLite database
conn = sqlite3.connect('C:/Users/Ritin/OneDrive/Desktop/myproject/datadoc/server-side/database.db')
cursor = conn.cursor()

# Create the user_validation table
cursor.execute('''
CREATE TABLE IF NOT EXISTS user_validation (
    email TEXT PRIMARY KEY,
    username TEXT,
    password TEXT,
    otp INTEGER,
    timestamp TEXT
)
''')

# Create the users table
cursor.execute('''
CREATE TABLE IF NOT EXISTS users (
    email TEXT PRIMARY KEY,
    username TEXT,
    password TEXT,
    token TEXT
)
''')


cursor.execute('''
CREATE TABLE IF NOT EXISTS folders (
    folder_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    foldername_user TEXT,
    foldername_fs TEXT,
    folder_type TEXT,
    FOREIGN KEY (user_id) REFERENCES users(email) ON DELETE CASCADE
)
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS files (
    file_id INTEGER PRIMARY KEY AUTOINCREMENT,
    folder_id INTEGER,
    filename_user TEXT,
    filename_fs TEXT,
    FOREIGN KEY (folder_id) REFERENCES folders(folder_id) ON DELETE CASCADE
)
''')


# Commit the changes and close the connection
conn.commit()
conn.close()

print("Tables created successfully.")
