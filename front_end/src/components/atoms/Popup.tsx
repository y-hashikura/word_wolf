/**
 * ポップアップコンポーネント
 *
 * ポップアップを表示するためのUI部品です。
 * 
 * Props:
 * - open: ポップアップを表示するかどうか
 * - onClose: ポップアップを閉じるときに呼ばれる関数
 * - children: ポップアップの中身（テキストやアイコンなど）
 */

type Props = { 
  open: boolean; 
  onClose: () => void; 
  children: React.ReactNode;
  className?: string;
};
export default function Popup(
  { 
    open, 
    onClose, 
    children, 
    className = "" 
  }: Props
) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className={`bg-white rounded-2xl p-8 max-w-lg w-full relative ${className}`}>
        {children}
        <button className="absolute top-2 right-4 text-2xl text-gray-400 hover:text-[#e48b8b]" onClick={onClose}>×</button>
      </div>
    </div>
  );
}