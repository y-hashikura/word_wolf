/**
 * ユーザ確認ページ
 *
 * ユーザ確認ページを表示するためのページです。
 * 
 * Props:
 * - onAllConfirmed: 全てのユーザが確認されたときに呼ばれる関数
 */
import { useState } from "react";
import TopPageTemplate from "@/components/templates/PageTemplate";
import UserConfirmPanel from "@/components/organisms/UserConfirmPanel";
import { useGameData } from "@/context/GameDataContext";

export default function UserConfirmPage({ onAllConfirmed }: { onAllConfirmed: () => void }) {
  const { playerNames, questions } = useGameData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => setConfirmed(true);
  const handleNext = () => {
    if (currentIndex < playerNames.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setConfirmed(false);
    } else {
      onAllConfirmed();
    }
  };

  return (
    <TopPageTemplate>
      <UserConfirmPanel
        panelTitle="ユーザ確認/問題"
        userName={playerNames[currentIndex]}
        question={questions[currentIndex]}
        confirmed={confirmed}
        onConfirm={handleConfirm}
        onNext={handleNext}
      />
    </TopPageTemplate>
  );
}