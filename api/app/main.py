import sys
from pathlib import Path

project_root = Path(__file__).parent.parent.parent
sys.path.append(str(project_root))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import game_routes

def create_app() -> FastAPI:
    app = FastAPI(
        title="ワードウルフAPI",
        description="ワードウルフゲーム用のお題生成・役職割り当てAPI",
        version="1.0.0"
    )

    # CORS設定
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # ルーター登録
    app.include_router(game_routes.router)

    @app.get("/")
    async def root():
        return {"message": "ワードウルフAPI"}

    @app.get("/health")
    async def health_check():
        return {"status": "healthy"}

    return app

app = create_app()
