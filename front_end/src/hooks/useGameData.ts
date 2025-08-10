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
import type { PlayerInfo } from "@/lib/types";

export function useGameData() {

  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [questions, setQuestions] = useState<string[]>([]);
  const [playerInfoByName, setPlayerInfoByName] = useState<Record<string, PlayerInfo>>({});
  const [villageTheme, setVillageTheme] = useState<string>("");
  const [wolfTheme, setWolfTheme] = useState<string>("");

  return {
    playerNames,
    setPlayerNames,
    questions,
    setQuestions,
    playerInfoByName,
    setPlayerInfoByName,
    villageTheme,
    setVillageTheme,
    wolfTheme,
    setWolfTheme,
  };
}

export type GameDataState = ReturnType<typeof useGameData>;