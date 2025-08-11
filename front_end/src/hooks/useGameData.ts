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
import type { GameResponse } from "@/lib/types";

export function useGameData() {
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [game, setGame] = useState<GameResponse | null>(null);

  return {
    playerNames,
    setPlayerNames,
    game,
    setGame,
  };
}

export type GameDataState = ReturnType<typeof useGameData>;