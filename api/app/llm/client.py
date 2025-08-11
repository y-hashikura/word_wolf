import asyncio
from typing import Tuple, Optional, Dict, Any, List
from shared.constants.enums import DifficultyLevel
import logging
import httpx
import json

logger = logging.getLogger(__name__)

class LLMClient:
    """LLMサービスとの通信クライアント（LangGraph対応）"""
    
    def __init__(self, base_url: str = "http://llm:8100"):
        self.base_url = base_url
        self.timeout = httpx.Timeout(60.0)  # LangGraphは時間がかかる可能性があるため60秒に延長
    
    async def generate_themes(
        self, 
        difficulty: DifficultyLevel, 
        category: Optional[str] = None,
    ) -> Tuple[str, str]:
        """
        LangGraphベースのテーマ生成
        """
        try:
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                request_data = {
                    "difficulty": difficulty.value,
                    "category": category,
                }
                
                response = await client.post(
                    f"{self.base_url}/llm/generate-themes",
                    json=request_data
                )
                response.raise_for_status()
                
                result = response.json()
                return result["village_theme"], result["wolf_theme"]
                
        except httpx.HTTPError as e:
            logger.error(f"LLMサービス通信エラー: {e}")
            # フォールバック処理
            return self._fallback_themes(difficulty, category)
        except (KeyError, ValueError) as e:
            logger.error(f"LLMレスポンス解析エラー: {e}")
            return self._fallback_themes(difficulty, category)
    
    async def analyze_game_context(
        self,
        players: List[str],
        difficulty: DifficultyLevel,
        category: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        ゲームコンテキスト分析（LangGraph用）
        プレイヤー数や難易度に基づいて最適なテーマ生成戦略を決定
        """
        try:
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                request_data = {
                    "players": players,
                    "difficulty": difficulty.value,
                    "category": category
                }
                
                response = await client.post(
                    f"{self.base_url}/llm/analyze-context",
                    json=request_data
                )
                response.raise_for_status()
                
                return response.json()
                
        except Exception as e:
            logger.error(f"コンテキスト分析エラー: {e}")
            return {
                "strategy": "default",
                "theme_complexity": difficulty.value,
                "estimated_duration": 300  # 5分
            }
    
    async def generate_themed_content(
        self,
        theme_type: str,
        base_theme: str,
        context: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        特定テーマに基づいたコンテンツ生成
        """
        try:
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                request_data = {
                    "theme_type": theme_type,
                    "base_theme": base_theme,
                    "context": context
                }
                
                response = await client.post(
                    f"{self.base_url}/llm/generate-themes",
                    json=request_data
                )
                response.raise_for_status()
                
                return response.json()
                
        except Exception as e:
            logger.error(f"テーマコンテンツ生成エラー: {e}")
            return {"content": base_theme, "variations": []}

# シングルトンインスタンス
llm_client = LLMClient()