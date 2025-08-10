/**
 * ゲーム設定フック
 *
 * ゲーム設定を管理するためのフックです。
 * 
 * Props:
 * - playerCount: プレイヤーの人数
 * - wolfCount: ウルフの人数
 * - talkTime: トークタイム(分)
 */
import { useState } from "react";

export function useGameSettings() {
  // プレイヤー数
  const [playerCount, setPlayerCount] = useState(3);
  // ウルフ数
  const [wolfCount, setWolfCount] = useState(1);
  // トークタイム(分)
  const [talkTime, setTalkTime] = useState(3);

  return {
    playerCount,
    setPlayerCount,
    wolfCount,
    setWolfCount,
    talkTime,
    setTalkTime,
  };
}

export type GameSettingsState = ReturnType<typeof useGameSettings>;