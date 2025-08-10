from pydantic import BaseModel, Field
from typing import List, Dict, Optional
from datetime import datetime
from app.constants.enums import DifficultyLevel, Role

class GameCreateRequest(BaseModel):
    """
    ゲーム作成リクエスト
    """
    players: List[str] = Field(..., min_items=3, max_items=10, description="プレイヤー名のリスト")
    wolf_count: Optional[int] = Field(1, ge=1, description="ウルフの人数")
    difficulty: Optional[DifficultyLevel] = Field(DifficultyLevel.NORMAL, description="難易度")
    category: Optional[str] = Field(None, description="お題のカテゴリ指定")

class PlayerInfo(BaseModel):
    """
    プレイヤー情報
    """
    theme: str = Field(..., description="プレイヤーに割り当てられたお題")
    is_wolf: bool = Field(..., description="ウルフかどうか")
    role: Role = Field(..., description="役職")

class GameResponse(BaseModel):
    """
    ゲーム作成レスポンス
    """
    village_theme: str = Field(..., description="村人のお題")
    wolf_theme: str = Field(..., description="ウルフのお題")
    players: Dict[str, PlayerInfo] = Field(..., description="プレイヤー情報")
    total_players: int = Field(..., description="総プレイヤー数")
    wolf_count: int = Field(..., description="ウルフ人数")