from typing import Dict, Any
from langgraph.graph import StateGraph, START, END
from langgraph.checkpoint.memory import MemorySaver
import logging
import random

from shared.models.models import LangGraphState
from shared.constants.enums import DifficultyLevel
from llm.app.services.llm_service import LLMService

logger = logging.getLogger(__name__)

class ThemeGenerationGraph:
    """
    シンプルなテーマ生成ワークフロー
    """
    
    def __init__(self):
        """
        コンストラクタ
        """
        self.llm_service = LLMService()
        self.graph = self._build_graph()
    
    def _build_graph(self) -> StateGraph:
        """
        シンプルなLangGraphワークフローを構築
        """
        workflow = StateGraph(LangGraphState)
        
        # ノードを追加
        workflow.add_node("generate_themes", self._generate_themes)
        workflow.add_node("finalize_result", self._finalize_result)
        
        # エッジを追加
        workflow.add_edge(START, "generate_themes")
        workflow.add_edge("generate_themes", "finalize_result")
        workflow.add_edge("finalize_result", END)
        
        # メモリセーバーを設定
        memory = MemorySaver()
        
        return workflow.compile(checkpointer=memory)
    
    async def _generate_themes(self, state: LangGraphState) -> LangGraphState:
        """
        LLMを使用してテーマを生成
        """
        logger.info("テーマ生成開始")
        
        try:
            # LLMサービスでテーマ生成
            village_theme, wolf_theme = await self.llm_service.generate_themes(
                difficulty=state.difficulty,
                category=state.category,
            )
            
            state.village_theme = village_theme
            state.wolf_theme = wolf_theme
            
            logger.info(f"テーマ生成完了: {village_theme} vs {wolf_theme}")
            
        except Exception as e:
            logger.error(f"テーマ生成エラー: {e}")
        
        return state
    
    async def _finalize_result(self, state: LangGraphState) -> LangGraphState:
        """
        結果を確定
        """
        logger.info("結果確定開始")
        
        if not state.village_theme or not state.wolf_theme:
            fallback = self._get_fallback_themes(state.difficulty)
            state.village_theme = fallback[0]
            state.wolf_theme = fallback[1]
            logger.warning(f"フォールバック適用: {state.village_theme} vs {state.wolf_theme}")
        else:
            logger.info(f"結果確定完了: {state.village_theme} vs {state.wolf_theme}")
        
        return state
    
    def _get_fallback_themes(self, difficulty: DifficultyLevel) -> tuple:
        """
        フォールバックテーマを取得
        """
        fallback_themes = {
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
        
        themes = fallback_themes.get(difficulty, fallback_themes[DifficultyLevel.NORMAL])
        return random.choice(themes)
    
    async def generate_themes(
        self,
        difficulty: DifficultyLevel,
        category: str = None,
    ) -> Dict[str, Any]:
        """
        テーマ生成のメインエントリーポイント
        """
        initial_state = LangGraphState(
            difficulty=difficulty,
            category=category,
        )
        try:
            config = {"configurable": {"thread_id": f"theme_gen_{id(initial_state)}"}}
            final_state = await self.graph.ainvoke(initial_state, config)
            
            # デバッグ情報を追加
            logger.info(f"final_state type: {type(final_state)}")
            logger.info(f"final_state content: {final_state}")
            
            # LangGraphの結果が辞書型の場合とオブジェクト型の場合の両方に対応
            if isinstance(final_state, dict):
                return {
                    "village_theme": final_state.get("village_theme"),
                    "wolf_theme": final_state.get("wolf_theme"),
                }
            else:
                return {
                    "village_theme": final_state.village_theme,
                    "wolf_theme": final_state.wolf_theme,
                }
            
        except Exception as e:
            logger.error(f"ワークフロー実行エラー: {e}")
            fallback = self._get_fallback_themes(difficulty)
            return {
                "village_theme": fallback[0],
                "wolf_theme": fallback[1],
            }