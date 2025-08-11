import sys
from pathlib import Path
import logging

# プロジェクトルートをPythonパスに追加
project_root = Path(__file__).parent.parent.parent
if str(project_root) not in sys.path:
    sys.path.append(str(project_root))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from llm.app.routes import llm_route

# ログ設定
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def create_app() -> FastAPI:
    """
    FastAPIアプリケーション作成
    """
    app = FastAPI(
        title="ワードウルフLLMサービス",
        description="ワードウルフゲーム用テーマ生成サービス（OpenAI連携）",
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
    app.include_router(llm_route.router)

    @app.get("/")
    async def root():
        return {"message": "ワードウルフLLMサービス", "status": "running"}

    @app.get("/health")
    async def health_check():
        return {"status": "healthy", "service": "llm"}

    return app

app = create_app()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8100)