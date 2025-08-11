import openai
import json
import random
import logging
import os
from typing import Tuple, Optional

from shared.constants.enums import DifficultyLevel

logger = logging.getLogger(__name__)

class LLMService:
    """
    LLMサービス（シンプル版）
    """
    
    def __init__(self):
        """
        コンストラクタ
        """
        # OpenAI APIキー設定
        api_key = os.getenv("OPENAI_API_KEY")
        self.mock_mode = not api_key
        
        if self.mock_mode:
            logger.warning("OpenAI APIキーが設定されていません。モックモードで動作します。")
            self.client = None
        else:
            self.client = openai.AsyncOpenAI(api_key=api_key)
        
        # フォールバック用テーマ
        self.fallback_themes = self._init_fallback_themes()
    
    def _init_fallback_themes(self) -> dict:
        """
        フォールバック用テーマデータ
        """
        return {
            DifficultyLevel.EASY: [
                ("犬", "猫"), ("りんご", "みかん"), ("電車", "バス"),
                ("赤", "青"), ("本", "雑誌"), ("コーヒー", "紅茶")
            ],
            DifficultyLevel.NORMAL: [
                ("映画", "ドラマ"), ("ラーメン", "うどん"), ("サッカー", "野球"),
                ("医者", "看護師"), ("漫画", "アニメ"), ("カレー", "シチュー")
            ],
            DifficultyLevel.HARD: [
                ("コーラ", "ペプシ"), ("マヨネーズ", "ドレッシング"), ("スマホ", "タブレット"),
                ("小説", "エッセイ"), ("緑茶", "ほうじ茶"), ("醤油", "ポン酢")
            ]
        }
    
    async def generate_themes(
        self, 
        difficulty: DifficultyLevel, 
        category: Optional[str] = None,
    ) -> Tuple[str, str]:
        """
        LLMを使用してテーマペアを生成（1回のみ）
        """
        try:
            logger.info(f"LLMテーマ生成開始: difficulty={difficulty.value}, category={category}")
            
            if self.mock_mode:
                return self._generate_fallback_theme(difficulty)
            
            # プロンプト構築
            prompt = self._build_prompt(difficulty, category)
            
            # LLM呼び出し
            response = await self._call_openai(prompt)
            
            # レスポンス解析
            village_theme, wolf_theme = self._parse_response(response)
            
            logger.info(f"LLMテーマ生成完了: {village_theme} vs {wolf_theme}")
            return village_theme, wolf_theme
            
        except Exception as e:
            logger.error(f"LLMテーマ生成エラー: {e}")
            return self._generate_fallback_theme(difficulty)
    
    def _build_prompt(
        self, 
        difficulty: DifficultyLevel, 
        category: Optional[str], 
    ) -> str:
        """
        シンプルなプロンプトを構築
        """
        difficulty_descriptions = {
            DifficultyLevel.EASY: "初心者向け：明確で分かりやすい違いがあり、日常的で馴染み深いもの",
            DifficultyLevel.NORMAL: "中級者向け：適度な類似性があり、少し考えれば区別できる程度",
            DifficultyLevel.HARD: "上級者向け：非常に細かい違いで、深い議論が必要な程度"
        }
        
        prompt = (
            f"""あなたはワードウルフゲーム用のテーマ生成エキスパートです。

            以下の条件でワードウルフゲーム用のテーマペアを生成してください：

            【条件】
            - 難易度: {difficulty.value} ({difficulty_descriptions[difficulty]})
            - カテゴリ：{category if category else "無し"}

            【要求事項】
            - 村人テーマとウルフテーマは似ているが明確に区別できること
            - {difficulty.value}レベルに適した難易度であること
            - 日本語で回答すること
            - 短い単語またはフレーズ（1-4文字程度）にすること
            - 議論が盛り上がる面白いテーマにすること

            【出力形式】
            {{
                "village_theme": "村人のテーマ",
                "wolf_theme": "ウルフのテーマ"
            }}

            必ずJSON形式で回答してください。説明は不要です。"""
        )
        
        return prompt
    
    async def _call_openai(self, prompt: str) -> str:
        """
        OpenAI APIを呼び出し
        """
        try:
            response = await self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {
                        "role": "system",
                        "content": "あなたはワードウルフゲーム用のテーマ生成エキスパートです。JSON形式で正確に回答してください。"
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=0.8,
                max_tokens=100,
                timeout=30
            )
            
            return response.choices[0].message.content.strip()
            
        except Exception as e:
            logger.error(f"OpenAI API呼び出しエラー: {e}")
            raise
    
    def _parse_response(self, response: str) -> Tuple[str, str]:
        """
        LLMレスポンスを解析
        """
        try:
            data = json.loads(response)
            village_theme = data["village_theme"].strip()
            wolf_theme = data["wolf_theme"]
            
            if not village_theme or not wolf_theme:
                raise ValueError("空のテーマが返されました")
            
            return village_theme, wolf_theme
            
        except (json.JSONDecodeError, KeyError, ValueError) as e:
            logger.error(f"レスポンス解析エラー: {e}, response: {response}")
            raise ValueError(f"LLMレスポンスの解析に失敗しました: {e}")
    
    def _generate_fallback_theme(self, difficulty: DifficultyLevel) -> Tuple[str, str]:
        """
        フォールバックテーマ生成
        """
        themes = self.fallback_themes.get(difficulty, self.fallback_themes[DifficultyLevel.NORMAL])
        village_theme, wolf_theme = random.choice(themes)
        
        logger.info(f"フォールバックテーマ使用: {village_theme} vs {wolf_theme}")
        return village_theme, wolf_theme