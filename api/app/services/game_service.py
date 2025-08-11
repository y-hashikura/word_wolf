import sys
from pathlib import Path
import random
from typing import Dict, List, Tuple

# プロジェクトルートをPythonパスに追加（sharedモジュール用）
project_root = Path(__file__).parent.parent.parent.parent
if str(project_root) not in sys.path:
    sys.path.append(str(project_root))

from shared.models.models import PlayerInfo, GameResponse
from shared.constants.enums import Role, DifficultyLevel
from app.llm.client import LLMClient

class GameService:
    """
    ゲームサービスクラス
    """
    def __init__(self):
        """
        コンストラクタ
        """
        # LLMクライアント
        self.llm_client = LLMClient()
    
    async def generate_themes(
        self, 
        difficulty: DifficultyLevel, 
        category: str = None, 
    ) -> Tuple[str, str]:
        """
        ゲームテーマ作成（LLM連携対応）
        """
        try:
            village_theme, wolf_theme = await self.llm_client.generate_themes(
                difficulty=difficulty,
                category=category,
            )
            return village_theme, wolf_theme
        except Exception as e:
            return self._fallback_themes(difficulty, category)
    
    def _fallback_themes(self, difficulty: DifficultyLevel, category: str = None) -> Tuple[str, str]:
        """
        LLMサービス障害時のフォールバック
        """
        easy_themes = [
            ("犬", "猫"),
            ("りんご", "みかん"),
            ("電車", "バス"),
            ("コーヒー", "紅茶"),
        ]
        
        normal_themes = [
            ("サラダ油", "油"),
            ("ラーメン", "うどん"),
            ("映画", "ドラマ"),
            ("漫画", "アニメ"),
        ]
        
        hard_themes = [
            ("コーラ", "ペプシ"),
            ("マヨネーズ", "ドレッシング"),
            ("スマホ", "タブレット"),
            ("小説", "エッセイ"),
        ]
        
        theme_dict = {
            DifficultyLevel.EASY: easy_themes,
            DifficultyLevel.NORMAL: normal_themes,
            DifficultyLevel.HARD: hard_themes,
        }
        
        selected_themes = theme_dict[difficulty]
        village_theme, wolf_theme = random.choice(selected_themes)
        
        return village_theme, wolf_theme
    
    def assign_roles(self, players: List[str], wolf_count: int, village_theme: str, wolf_theme: str) -> Dict[str, PlayerInfo]:
        """
        プレイヤーに役職割り当て
        """
        shuffled_players = players.copy()
        random.shuffle(shuffled_players)
        
        result = {}
        
        # ウルフを割り当て
        for i in range(wolf_count):
            player = shuffled_players[i]
            result[player] = PlayerInfo(
                theme=wolf_theme,
                is_wolf=True,
                role=Role.WOLF
            )
        
        # 村人を割り当て
        for i in range(wolf_count, len(shuffled_players)):
            player = shuffled_players[i]
            result[player] = PlayerInfo(
                theme=village_theme,
                is_wolf=False,
                role=Role.VILLAGER
            )
        
        return result
    
    async def create_game(self, players: List[str], wolf_count: int, difficulty: DifficultyLevel, category: str = None) -> GameResponse:
        """
        ゲーム作成してレスポンスを返す
        """
        
        # バリデーション
        if wolf_count >= len(players):
            raise ValueError("ウルフの人数はプレイヤー総数より少なくしてください")
        
        # お題生成
        village_theme, wolf_theme = await self.generate_themes(difficulty, category)
        
        # プレイヤー割り当て
        players_info = self.assign_roles(players, wolf_count, village_theme, wolf_theme)
        
        # レスポンス作成
        return GameResponse(
            village_theme=village_theme,
            wolf_theme=wolf_theme,
            players=players_info,
            total_players=len(players),
            wolf_count=wolf_count
        )

# インスタンス
game_service = GameService()