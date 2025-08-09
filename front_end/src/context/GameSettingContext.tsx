/**
 * ゲーム設定コンテキスト
 *
 * ゲーム設定を管理するためのコンテキストです。
 * 
 * Props:
 * - children: ゲーム設定の中身（テキストやアイコンなど）
 */
import { createContext, useContext, type ReactNode } from "react";
import { useGameSettings as useGameSettingsState, type GameSettingsState } from "@/hooks/useGameSettings";

const GameSettingsContext = createContext<GameSettingsState | undefined>(undefined);

export function GameSettingsProvider({ children }: { children: ReactNode }) {
  const state = useGameSettingsState();
  return (
    <GameSettingsContext.Provider value={state}>
      {children}
    </GameSettingsContext.Provider>
  );
}

export function useGameSettings() {
  const ctx = useContext(GameSettingsContext);
  if (!ctx) throw new Error("useGameSettings must be used within GameSettingsProvider");
  return ctx;
}