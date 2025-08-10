/**
 * ゲーム開始ページ
 *
 * ゲーム開始ページを表示するためのページです。
 * 
 * Props:
 * - onTalkEnd: トーク終了ときに呼ばれる関数
 */
import { useState, useEffect, useRef } from "react";
import TopPageTemplate from "@/components/templates/PageTemplate";
import GameStartPanel from "@/components/organisms/GameStartPanel";
import { useGameSettings } from "@/context/GameSettingContext";

export default function GameStartPage({ onTalkEnd }: { onTalkEnd: () => void }) {
  const { talkTime } = useGameSettings();
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(talkTime * 60);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!started) return;
    if (timeLeft <= 0) {
      onTalkEnd();
      return;
    }
    timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [started, timeLeft, onTalkEnd]);

  const handleStart = () => setStarted(true);
  const handleForceEnd = () => onTalkEnd();

  return (
    <TopPageTemplate>
      <GameStartPanel
        started={started}
        onStart={handleStart}
        onForceEnd={handleForceEnd}
        timeLeft={timeLeft}
      />
    </TopPageTemplate>
  );
}