/**
 * 設定パネルコンポーネント
 *
 * 設定パネルを表示するためのUI部品です。
 * 
 * Props:
 * - playerCount: プレイヤーの人数
 * - setPlayerCount: プレイヤーの人数を設定する関数
 */
import QuestionCounter from "@/components/molecules/QuestionCounter";
import PanelTitle from "@/components/atoms/PanelTitle";

type Props = {
  playerCount: number;
  setPlayerCount: (n: number) => void;
  wolfCount: number;
  setWolfCount: (n: number) => void;
  talkTime: number;
  setTalkTime: (n: number) => void;
  panelTitle: string;
};

export default function SettingsPanel({
  playerCount, setPlayerCount,
  wolfCount, setWolfCount,
  talkTime, setTalkTime,
  panelTitle
}: Props) {
  return (
    <div className="bg-[#faf5e6] rounded-2xl p-8 flex flex-col gap-4 w-96 max-w-full mx-auto">
      <PanelTitle>{panelTitle}</PanelTitle>
      <QuestionCounter
        label="プレイヤーの人数は？"
        value={playerCount}
        onIncrement={() => setPlayerCount(playerCount + 1)}
        onDecrement={() => setPlayerCount(Math.max(3, playerCount - 1))}
        min={3}
        unit="人"
      />
      <QuestionCounter
        label="ウルフの人数は？"
        value={wolfCount}
        onIncrement={() => setWolfCount(wolfCount + 1)}
        onDecrement={() => setWolfCount(Math.max(1, wolfCount - 1))}
        min={1}
        unit="人"
      />
      <QuestionCounter
        label="トークタイム？"
        value={talkTime}
        onIncrement={() => setTalkTime(talkTime + 1)}
        onDecrement={() => setTalkTime(Math.max(1, talkTime - 1))}
        min={1}
        unit="分"
      />
    </div>
  );
}