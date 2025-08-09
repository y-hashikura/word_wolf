/**
 * ボタンコンポーネント
 *
 * ボタンを表示するためのUI部品です。
 * 
 * Props:
 * - children: ボタンの中身（テキストやアイコンなど）
 * - onClick: ボタンがクリックされたときに呼ばれる関数
 * - disabled: ボタンを無効化するかどうか
 * - className: ボタンのスタイルをカスタマイズするためのクラス名
 */

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode };

export default function Button(
  { 
    children, ...props 
  }: Props
) {
  return (
    <button
      className="bg-white 
                text-[#e48b8b] 
                font-bold 
                rounded-full 
                px-10 
                py-3 
                text-lg 
                hover:opacity-90 
                transition"
      {...props}
    >
      {children}
    </button>
  );
}