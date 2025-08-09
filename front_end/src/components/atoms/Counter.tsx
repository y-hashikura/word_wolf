/**
 * カウンターコンポーネント
 *
 * 数値を増減するためのUI部品です。
 * 
 * Props:
 * - value: 現在の値（表示される数値）
 * - onIncrement: 値を増やすときに呼ばれる関数
 * - onDecrement: 値を減らすときに呼ばれる関数
 * - min: 最小値（省略時は1）
 * - max: 最大値（省略時は10）
 * - unit: 単位（例: "人", "分" など、省略可）
 */

type Props = {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
  unit?: string;
};
export default function Counter(
  { 
    value, 
    onIncrement, 
    onDecrement, 
    min = 1, 
    max = 10, 
    unit = "" 
  }: Props
) {
  return (
    <div className="flex items-center bg-white rounded-full px-4 py-2">
      <button 
        className="text-2xl px-3 text-gray-500 disabled:opacity-40" 
        onClick={onDecrement} 
        disabled={value <= min}
      >
        －
      </button>
      <span 
        className="mx-4 text-xl font-bold"
      >
        {value}{unit}
      </span>
      <button 
        className="text-2xl px-3 text-gray-500 disabled:opacity-40" 
        onClick={onIncrement} 
        disabled={value >= max}
      >
        ＋
      </button>
    </div>
  );
}