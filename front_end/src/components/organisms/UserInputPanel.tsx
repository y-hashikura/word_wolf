/**
 * ユーザ入力パネルコンポーネント
 *
 * ユーザ入力パネルを表示するためのUI部品です。
 * 
 * Props:
 * - panelTitle: パネルのタイトル
 * - playerCount: プレイヤーの人数
 * - playerNames: プレイヤーの名前
 */
import PanelTitle from "@/components/atoms/PanelTitle";
import TextBox from "@/components/atoms/TextBox";

type Props = {
  panelTitle: string;
  playerCount: number;
  playerNames: string[];
  setPlayerNames: (names: string[]) => void;
};

export default function UserInputPanel({
  panelTitle,
  playerCount,
  playerNames,
  setPlayerNames,
}: Props) {
  // スクロール可能にするためmax-hとoverflow-autoを指定
  return (
    <div className="bg-[#faf5e6] rounded-2xl p-6 flex flex-col gap-3 w-96 max-w-full mx-auto max-h-[420px] overflow-auto">
      <PanelTitle>{panelTitle}</PanelTitle>
      <div className="flex flex-col gap-3">
        {Array.from({ length: playerCount }).map((_, i) => (
          <TextBox
            key={i}
            placeholder={`プレイヤー${i + 1}の名前`}
            value={playerNames[i] || ""}
            onChange={e => {
              const newNames = [...playerNames];
              newNames[i] = e.target.value;
              setPlayerNames(newNames);
            }}
          />
        ))}
      </div>
    </div>
  );
}