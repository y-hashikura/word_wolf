from enum import Enum

class DifficultyLevel(str, Enum):
    """
    ゲーム難易度
    """
    EASY = "easy"
    NORMAL = "normal" 
    HARD = "hard"

class Role(str, Enum):
    """
    役職
    """
    VILLAGER = "villager"
    WOLF = "wolf"