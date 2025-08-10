/**
 * ゲームデータコンテキスト
 *
 * ゲームデータを管理するためのコンテキストです。
 * 
 * Props:
 * - children: ゲームデータの中身（テキストやアイコンなど）
 */
import { createContext, useContext, type ReactNode } from "react";
import { useGameData as useGameDataState, type GameDataState } from "@/hooks/useGameData";

const GameDataContext = createContext<GameDataState | undefined>(undefined);

export function GameDataProvider({ children }: { children: ReactNode }) {
  const state = useGameDataState();
  return (
    <GameDataContext.Provider value={state}>
      {children}
    </GameDataContext.Provider>
  );
}

export function useGameData() {
  const ctx = useContext(GameDataContext);
  if (!ctx) throw new Error("useGameData must be used within GameDataProvider");
  return ctx;
}