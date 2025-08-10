/**
 * トーク終了パネルコンポーネント
 *
 * トーク終了パネルを表示するためのUI部品です。
 * 
 * Props:
 * - onShowResult: 結果を表示するときに呼ばれる関数
 */
import PanelTitle from "@/components/atoms/PanelTitle";
import QuestionLabel from "@/components/atoms/QuestionLabel";
import Button from "@/components/atoms/Button";

type Props = {
  onShowResult: () => void;
};

export default function TalkEndPanel({ onShowResult }: Props) {
  return (
    <div className="bg-[#faf5e6] rounded-2xl p-6 flex flex-col gap-4 w-96 max-w-full mx-auto items-center">
      <PanelTitle>トーク終了</PanelTitle>
      <QuestionLabel>
        ウルフだと思う人を全員でいっせーのせで指をさしてください。<br />
        終わったら「答え合わせ」ボタンを押してください。
      </QuestionLabel>
      <Button onClick={onShowResult}>答え合わせ</Button>
    </div>
  );
}