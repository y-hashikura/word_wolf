/**
 * ユーザ確認パネルコンポーネント
 *
 * ユーザ確認パネルを表示するためのUI部品です。
 * 
 * Props:
 * - panelTitle: パネルのタイトル
 * - userName: ユーザの名前
 * - question: お題
 */
import PanelTitle from "@/components/atoms/PanelTitle";
import QuestionLabel from "@/components/atoms/QuestionLabel";
import Button from "@/components/atoms/Button";

type Props = {
  panelTitle: string;
  userName: string;
  question: string;
  confirmed: boolean;
  onConfirm: () => void;
  onNext: () => void;
};

export default function UserConfirmPanel({
  panelTitle,
  userName,
  question,
  confirmed,
  onConfirm,
  onNext,
}: Props) {
  return (
    <div className="bg-[#faf5e6] rounded-2xl p-6 flex flex-col gap-4 w-96 max-w-full mx-auto">
      <PanelTitle>{panelTitle}</PanelTitle>
      <div className="flex flex-col items-center gap-4">
        {!confirmed ? (
          <>
            <QuestionLabel>{`${userName}ですか？`}</QuestionLabel>
            <Button onClick={onConfirm}>はい</Button>
          </>
        ) : (
          <>
            <QuestionLabel>あなたのお題は</QuestionLabel>
            <div className="text-xl font-bold text-[#e48b8b] mb-2">「{question}」</div>
            <QuestionLabel>確認が終わりましたら次へを押してください。</QuestionLabel>
            <Button onClick={onNext}>次へ</Button>
          </>
        )}
      </div>
    </div>
  );
}