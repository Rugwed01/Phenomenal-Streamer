import os
import subprocess
import shutil
from flask import Flask, make_response, send_from_directory
from flask_cors import CORS
from api import api_bp
from extensions import mongo

app = Flask(__name__)
CORS(app)

# --- Database Configuration ---
app.config["MONGO_URI"] = "."
mongo.init_app(app)

# --- Register API Blueprint ---
app.register_blueprint(api_bp, url_prefix='/api')

# --- Streaming Logic ---
ffmpeg_process = None
RTSP_URL = "rtsp://rtspstream:BUMpi3DSnUYdpbGkWX-xN@zephyr.rtsp.stream/movie"
HLS_OUTPUT_DIR = os.path.join(app.static_folder, 'hls')

def start_ffmpeg_process():
    global ffmpeg_process
    # Stop any existing process before starting a new one
    if ffmpeg_process and ffmpeg_process.poll() is None:
        ffmpeg_process.terminate()
        ffmpeg_process.wait()

    # Clean the directory for a fresh start
    if os.path.exists(HLS_OUTPUT_DIR):
        shutil.rmtree(HLS_OUTPUT_DIR)
    os.makedirs(HLS_OUTPUT_DIR)

    base_url = "http://127.0.0.1:5000/stream/hls/"
    command = [
        'ffmpeg', '-rtsp_transport', 'tcp', '-stream_loop', '-1', '-i', RTSP_URL,
        '-c:v', 'libx264', '-profile:v', 'baseline', '-preset', 'veryfast', '-crf', '23', 
        '-c:a', 'aac', '-f', 'hls', '-hls_time', '2', '-hls_list_size', '5',
        '-hls_flags', 'delete_segments', '-hls_base_url', base_url,
        os.path.join(HLS_OUTPUT_DIR, 'stream.m3u8')
    ]

    print("Starting continuous FFmpeg transcoding...")
    ffmpeg_process = subprocess.Popen(command, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

# --- Routes ---
@app.route('/start-stream')
def start_stream_endpoint():
    start_ffmpeg_process()
    return {"message": "Stream process started."}

@app.route('/stream/hls/<filename>')
def serve_hls(filename):
    response = make_response(send_from_directory(HLS_OUTPUT_DIR, filename))
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    return response

@app.route('/')
def main_page():
    return "Backend is running."

if __name__ == '__main__':

    app.run(debug=True, host='0.0.0.0') # Use the standard app.run for flask run command
