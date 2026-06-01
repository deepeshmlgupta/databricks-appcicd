from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount("/assets", StaticFiles(directory="frontend/assets"), name="assets")

@app.get("/")
def index():
    return FileResponse("frontend/index.html")

@app.get("/{path:path}")
def spa(path: str):
    return FileResponse("frontend/index.html")