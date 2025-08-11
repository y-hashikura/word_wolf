import logging
from typing import Tuple, Optional

from shared.constants.enums import DifficultyLevel
from llm.app.graphs.theme_generation_graph import ThemeGenerationGraph

logger = logging.getLogger(__name__)

class ThemeService:
    """
    シンプルなテーマ生成サービス
    """
    
    def __init__(self):
        """
        コンストラクタ
        """
        # テーマ生成ワークフローインスタンス
        self.graph = ThemeGenerationGraph()
    
    async def generate_themes(
        self, 
        difficulty: DifficultyLevel, 
        category: Optional[str] = None,
    ) -> Tuple[str, str]:
        """
        テーマペアを生成
        """
        try:
            logger.info(f"テーマ生成開始: difficulty={difficulty.value}, category={category}")
            
            # LangGraphワークフロー実行
            result = await self.graph.generate_themes(
                difficulty=difficulty,
                category=category
            )
            
            village_theme = result["village_theme"]
            wolf_theme = result["wolf_theme"]
            
            logger.info(f"テーマ生成完了: {village_theme} vs {wolf_theme}")
            
            return village_theme, wolf_theme
            
        except Exception as e:
            logger.error(f"テーマ生成エラー: {e}")
            # 最終フォールバック
            fallback_map = {
                DifficultyLevel.EASY: ("犬", "猫"),
                DifficultyLevel.NORMAL: ("映画", "ドラマ"),
                DifficultyLevel.HARD: ("コーラ", "ペプシ")
            }
            result = fallback_map.get(difficulty, ("一般", "特殊"))
            logger.warning(f"緊急フォールバック使用: {result}")
            return result

# シングルトンインスタンス
theme_service = ThemeService()