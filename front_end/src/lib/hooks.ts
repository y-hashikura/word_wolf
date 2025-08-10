import { useState } from "react";
import axios from "axios";
import type { GameCreateRequest, GameResponse } from "./types";

export function useGameApi() {
  const [gameResponse, setGameResponse] = useState<GameResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGame = async (params: GameCreateRequest) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post<GameResponse>("http://localhost:8000/game/create", params);
      setGameResponse(res.data);
      return res.data;
    } catch (e: any) {
      setError(e.message || "API Error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { gameResponse, fetchGame, loading, error };
}