/**
 * 質問ラベルコンポーネント
 *
 * 質問のラベルを表示するためのUI部品です。
 * 
 * Props:
 * - children: 質問のラベル（テキストやアイコンなど）
 */

type Props = { 
  children: React.ReactNode 
};
export default function QuestionLabel(
  { 
    children 
  }: Props
) {
  return (
    <span 
      className="text-gray-700 text-base font-semibold mb-2"
    >
      {children}
    </span>
  );
}