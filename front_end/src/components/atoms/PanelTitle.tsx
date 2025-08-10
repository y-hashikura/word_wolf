/**
 * パネルタイトルコンポーネント
 *
 * パネルのタイトルを表示するためのUI部品です。
 * 
 * Props:
 * - children: パネルのタイトル（テキストやアイコンなど）
 */

type Props = { 
  children: React.ReactNode 
};
export default function PanelTitle(
  { 
    children 
  }: Props
) {
  return (
    <h2 
      className="text-xl font-bold text-[#e48b8b] mb-2 mt-1 text-center"
    >
      {children}
    </h2>
  );
}