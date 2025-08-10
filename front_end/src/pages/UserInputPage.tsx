/**
 * ユーザ入力ページ
 *
 * ユーザ入力ページを表示するためのページです。
 * 
 * Props:
 * - onNext: 次のページに遷移するときに呼ばれる関数
 * - onBack: 前のページに遷移するときに呼ばれる関数
 */
import { useEffect } from "react";
import TopPageTemplate from "@/components/templates/PageTemplate";
import UserInputPanel from "@/components/organisms/UserInputPanel";
import Button from "@/components/atoms/Button";
import { useGameSettings } from "@/context/GameSettingContext";
import { useGameData } from "@/context/GameDataContext";

export default function UserInputPage({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { playerCount } = useGameSettings();
  const { playerNames, setPlayerNames, setQuestions } = useGameData();

  // 入力欄の初期化
  useEffect(() => {
    if (playerNames.length !== playerCount) {
      setPlayerNames(Array(playerCount).fill(""));
    }
  }, [playerCount]);

  // お題生成例
  function generateQuestions(names: string[]): string[] {
    const wolfIndex = Math.floor(Math.random() * names.length);
    return names.map((_, i) => (i === wolfIndex ? "ウルフのお題" : "村人のお題"));
  }

  return (
    <TopPageTemplate>
      <UserInputPanel
        panelTitle="ユーザ入力"
        playerCount={playerCount}
        playerNames={playerNames}
        setPlayerNames={setPlayerNames}
      />
      <div className="flex flex-row items-center justify-center gap-4 mt-8">
        <Button onClick={onBack}>戻る</Button>
        <Button
          onClick={() => {
            setQuestions(generateQuestions(playerNames));
            onNext();
          }}
          disabled={playerNames.some(n => !n)}
        >
          次へ
        </Button>
      </div>
    </TopPageTemplate>
  );
}
