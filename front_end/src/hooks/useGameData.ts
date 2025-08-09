/**
 * ゲームデータフック
 *
 * ゲームデータを管理するためのフックです。
 * 
 * Props:
 * - playerNames: プレイヤーの名前
 * - questions: お題
 */
import { useState } from "react";

export function useGameData() {

  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [questions, setQuestions] = useState<string[]>([]);

  return {
    playerNames,
    setPlayerNames,
    questions,
    setQuestions,
  };
}

export type GameDataState = ReturnType<typeof useGameData>;