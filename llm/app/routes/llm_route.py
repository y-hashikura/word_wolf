from fastapi import APIRouter, HTTPException
import logging

from shared.models.models import LLMThemeRequest, LLMThemeResponse
from shared.constants.enums import DifficultyLevel
from llm.app.services.theme_service import theme_service

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/llm", tags=["llm"])

@router.post("/generate-themes", response_model=LLMThemeResponse)
async def generate_themes(request: LLMThemeRequest):
    """
    ワードウルフテーマ生成エンドポイント
    """
    try:
        logger.info(f"テーマ生成リクエスト: {request}")
        
        # 難易度変換
        difficulty = DifficultyLevel(request.difficulty)
        
        # テーマ生成
        village_theme, wolf_theme = await theme_service.generate_themes(
            difficulty=difficulty,
            category=request.category,
        )
        
        return LLMThemeResponse(
            village_theme=village_theme,
            wolf_theme=wolf_theme,
        )
        
    except ValueError as e:
        logger.error(f"バリデーションエラー: {e}")
        raise HTTPException(status_code=400, detail=f"無効な入力: {str(e)}")
    except Exception as e:
        logger.error(f"テーマ生成エラー: {e}")
        raise HTTPException(status_code=500, detail="テーマ生成中にエラーが発生しました")

@router.get("/health")
async def health_check():
    """
    ヘルスチェックエンドポイント
    """
    try:
        village_theme, wolf_theme = await theme_service.generate_themes(
            difficulty=DifficultyLevel.EASY,
            category=None
        )
        return {
            "status": "healthy",
            "service": "llm",
            "openai_available": not theme_service.mock_mode,
            "test_generation": {
                "village_theme": village_theme,
                "wolf_theme": wolf_theme
            }
        }
    except Exception as e:
        logger.error(f"ヘルスチェックエラー: {e}")
        return {
            "status": "unhealthy", 
            "service": "llm",
            "error": str(e)
        }