/**
 * ユーザ入力ページ
 *
 * ユーザ入力ページを表示するためのページです。
 * 
 * Props:
 * - onNext: 次のページに遷移するときに呼ばれる関数
 * - onBack: 前のページに遷移するときに呼ばれる関数
 */
import TopPageTemplate from "@/components/templates/PageTemplate";
import UserInputPanel from "@/components/organisms/UserInputPanel";
import Button from "@/components/atoms/Button";
import { useGameSettings } from "@/context/GameSettingContext";
import { useGameData } from "@/context/GameDataContext";
import { useGameApi } from "@/lib/hooks";

export default function UserInputPage({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { playerCount, wolfCount } = useGameSettings();
  const { playerNames, setPlayerNames } = useGameData();
  const { fetchGame, loading, error } = useGameApi();

  const handleNext = async () => {
    const result = await fetchGame({
      players: playerNames,
      wolf_count: wolfCount,
    });
    if (result) {
      onNext();
    }
  };

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
            handleNext();
          }}
          disabled={playerNames.some(n => !n) || loading}
        >
          {loading ? "通信中..." : "次へ"}
        </Button>
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </TopPageTemplate>
  );
}


