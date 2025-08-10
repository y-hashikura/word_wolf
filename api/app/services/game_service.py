import random
from typing import Dict, List, Tuple
from app.models.models import PlayerInfo, GameResponse
from app.constants.enums import Role, DifficultyLevel

class GameService:
    """
    ゲームサービスクラス
    """
    def generate_themes(self, difficulty: DifficultyLevel, category: str = None) -> Tuple[str, str]:
        """
        ゲームテーマ作成
        TODO: 将来的にはLLM側で自動生成なおかつ同じお題を生成しないようにする仕組みも検討
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
    
    def create_game(self, players: List[str], wolf_count: int, difficulty: DifficultyLevel, category: str = None) -> GameResponse:
        """
        ゲーム作成してレスポンスを返す
        """
        
        # バリデーション
        if wolf_count >= len(players):
            raise ValueError("ウルフの人数はプレイヤー総数より少なくしてください")
        
        # お題生成
        village_theme, wolf_theme = self.generate_themes(difficulty, category)
        
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