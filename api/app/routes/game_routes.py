from fastapi import APIRouter, HTTPException
from shared.models.models import GameCreateRequest, GameResponse
from app.services.game_service import game_service

router = APIRouter(prefix="/game", tags=["game"])

@router.post("/create", response_model=GameResponse)
async def create_game(request: GameCreateRequest):
    """
    ワードウルフゲーム作成ルーター
    """
    try:
        response = game_service.create_game(
            players=request.players,
            wolf_count=request.wolf_count,
            difficulty=request.difficulty,
            category=request.category
        )
        return response
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="ゲーム作成中にエラーが発生しました")