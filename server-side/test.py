import sqlite3

def dump_schema(db_path, output_file):
    try:
        # Connect to the SQLite database
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Fetch the schema
        schema = []
        for row in cursor.execute("SELECT sql FROM sqlite_master WHERE type='table';"):
            schema.append(row[0])
        
        # Write the schema to the output file
        with open(output_file, 'w') as f:
            for statement in schema:
                f.write(statement + '/n')
        
        print(f"Schema dumped to {output_file}")
    
    except Exception as e:
        print(f"An error occurred: {e}")
    
    finally:
        # Close the connection
        if conn:
            conn.close()

# Example usage
db_path = "C:/Users/Ritin/OneDrive/Desktop/MTREE/documents/chinook/chinook.db" # Replace with your .db file path
output_file = "C:/Users/Ritin/OneDrive/Desktop/MTREE/documents/chinook/chinook.txt" # Replace with your desired output file path
dump_schema(db_path, output_file)
