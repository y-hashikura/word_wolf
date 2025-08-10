/**
 * 質問カウンターコンポーネント
 *
 * 質問のカウンターを表示するためのUI部品です。
 * 
 * Props:
 * - label: 質問のラベル（テキストやアイコンなど）
 * - value: 現在の値（表示される数値）
 * - onIncrement: 値を増やすときに呼ばれる関数
 * - onDecrement: 値を減らすときに呼ばれる関数
 * - min: 最小値（省略時は1）
 * - max: 最大値（省略時は10）
 * - unit: 単位（例: "人", "分" など、省略可）
 */

import QuestionLabel from "@/components/atoms/QuestionLabel";
import Counter from "@/components/atoms/Counter";

type Props = {
  label: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
  unit?: string;
};

export default function QuestionCounter(props: Props) {
  return (
    <div className="flex flex-col items-center mb-2">
      <QuestionLabel>{props.label}</QuestionLabel>
      <Counter {...props} />
    </div>
  );
}