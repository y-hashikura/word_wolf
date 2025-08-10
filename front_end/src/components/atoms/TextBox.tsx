/**
 * テキストボックスコンポーネント
 *
 * テキストを入力するためのUI部品です。
 * 
 * Props:
 * - children: テキストボックスの中身（テキストやアイコンなど）
 */
type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function TextBox(props: Props) {
  return (
    <input
      {...props}
      className={
        "border rounded-full px-6 py-3 text-lg w-full focus:outline-none focus:ring-2 focus:ring-[#e48b8b] " +
        (props.className ?? "")
      }
    />
  );
}