# User Documentation

This guide explains how to configure and use the Phenomenal Streamer application.

---

## 1. Configuration: Setting the RTSP URL

Before running the application, you must configure it to point to your specific RTSP stream. This is a one-time setup step done in the backend code.

### Locate the Backend Configuration File
-   Navigate to the backend folder: `backend-engine/`.
-   Open the file named `app.py` in a text editor.

### Find the RTSP URL Variable
-   Near the top of the `app.py` file, you will find the following line:
    ```python
    RTSP_URL = "rtsp://rtspstream:BUMpi3DSnUYdpbGkWX-xN@zephyr.rtsp.stream/movie"
    ```

### Update the URL
-   Replace the entire URL inside the double quotes (`"..."`) with the URL of your own RTSP stream.
-   Save the `app.py` file.

---

## 2. Running the Application

To use the app, both the backend and frontend servers must be running. Please follow the instructions in the **"Running the Application"** section of the `README.md` file.

---

## 3. Using the App Interface

Once the servers are running, open your web browser to the frontend URL (e.g., `http://localhost:5173`).

### Viewing the Livestream
-   When you load the page, the application automatically starts the transcoding process.
-   You will see a "Waiting for stream..." message. After a few seconds, the video player will appear and begin playing the livestream automatically.

### Managing Overlays
The **"Overlay Controls"** panel on the right side of the screen allows you to manage the text overlays.

-   **To Add an Overlay:**
    1.  Type your desired text into the input box that says "Enter overlay text...".
    2.  Click the blue **"Add"** button.
    3.  The overlay text will immediately appear in two places:
        -   In the "Existing Overlays" list below the input form.
        -   In the dark display area directly above the video player.

-   **To Delete an Overlay:**
    1.  Find the overlay you wish to remove in the "Existing Overlays" list.
    2.  Click the red **"Delete"** button next to it.
    3.  The overlay will be permanently removed from the list and the display area.
