# Phenomenal Streamer

This is a full-stack application designed to transcode a live RTSP video stream into HLS format for web playback. It features a Flask backend for stream processing and a React frontend that allows users to view the stream and manage simple text overlays stored in a MongoDB database.

## Project Structure

The project is organized into two main folders:

-   `/` (Root Directory)
    -   `/backend-engine`: Contains the Flask backend application.
    -   `/frontend-project`: Contains the React frontend application.

## Setup and Installation

### Backend (Flask)

1.  **Navigate to the backend directory:**
    ```bash
    cd backend-engine
    ```
2.  **Create and activate a virtual environment:**
    ```bash
    # For Windows
    python -m venv venv
    venv\Scripts\activate

    # For macOS/Linux
    python3 -m venv venv
    source venv/bin/activate
    ```
3.  **Install the required Python packages:**
    ```bash
    pip install Flask Flask-Cors Flask-PyMongo dnspython
    ```
4.  **Configure your MongoDB connection:**
    -   Open the `app.py` file.
    -   Locate the line `app.config["MONGO_URI"] = "..."`
    -   Replace the placeholder with your actual MongoDB connection string.

### Frontend (React)

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../frontend-project
    ```
2.  **Install the required Node.js packages:**
    ```bash
    npm install
    ```

## Running the Application

You will need to run the backend and frontend servers simultaneously in two separate terminals.

1.  **Start the Backend Server:**
    -   Open a terminal and navigate to the `/backend-engine` directory.
    -   Ensure your virtual environment is activated.
    -   Run the command:
        ```bash
        flask run
        ```
    -   The backend will be running on `http://127.0.0.1:5000`.

2.  **Start the Frontend Server:**
    -   Open a second terminal and navigate to the `/frontend-project` directory.
    -   Run the command:
        ```bash
        npm run dev
        ```
    -   The frontend development server will start, typically on `http://localhost:5173`.

3.  **Access the Application:**
    -   Open your web browser and go to the URL provided by the frontend server (e.g., `http://localhost:5173`).

## Documentation

For more detailed information, please see the following documents:

-   **[User Guide](./USER_GUIDE.md):** Instructions on how to configure and use the application.
-   **[API Documentation](./API_DOCUMENTATION.md):** Detailed information about the CRUD API endpoints for developers.
