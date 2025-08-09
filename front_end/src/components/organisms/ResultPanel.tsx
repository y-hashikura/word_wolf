/**
 * 結果パネルコンポーネント
 *
 * 結果パネルを表示するためのUI部品です。
 * 
 * Props:
 * - wolfName: ウルフの名前
 * - wolfTheme: ウルフのお題
 * - villagerNames: 村人の名前
 * - villagerTheme: 村人のお題
 * - onBackToTop: TOPに戻るときに呼ばれる関数
 */
import PanelTitle from "@/components/atoms/PanelTitle";
import QuestionLabel from "@/components/atoms/QuestionLabel";
import Button from "@/components/atoms/Button";

type Props = {
  wolfName: string;
  wolfTheme: string;
  villagerNames: string[];
  villagerTheme: string;
  onBackToTop: () => void;
};

export default function ResultPanel({
  wolfName,
  wolfTheme,
  villagerNames,
  villagerTheme,
  onBackToTop,
}: Props) {
  return (
    <div className="bg-[#faf5e6] rounded-2xl p-6 flex flex-col gap-4 w-96 max-w-full mx-auto items-center">
      <PanelTitle>答え合わせ</PanelTitle>
      <div className="flex flex-col gap-2 w-full items-center">
        <QuestionLabel>
          <span className="font-bold text-[#e48b8b]">ウルフは…</span>
        </QuestionLabel>
        <div className="text-lg font-bold mb-2">
          {wolfName}さん、「{wolfTheme}」でした。
        </div>
        <QuestionLabel>
          <span className="font-bold text-[#e48b8b]">村人は…</span>
        </QuestionLabel>
        <div className="text-lg font-bold mb-2">
          {villagerNames.join("さん、")}さん、「{villagerTheme}」でした。
        </div>
      </div>
      <Button onClick={onBackToTop}>TOPに戻る</Button>
    </div>
  );
}