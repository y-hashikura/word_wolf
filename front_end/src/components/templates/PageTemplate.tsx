/**
 * ページテンプレートコンポーネント
 *
 * ページのテンプレートを表示するためのUI部品です。
 * 
 * Props:
 * - children: ページの中身（テキストやアイコンなど）
 */
import Title from "@/components/atoms/Title";
import TitleDescription from "@/components/atoms/TitleDescription";

type Props = { children: React.ReactNode };

export default function TopPageTemplate({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center" style={{
      background: "linear-gradient(135deg, #f8a8a8 0%, #f7b6b6 100%)"
    }}>
      <Title />
      <TitleDescription />
      {children}
    </div>
  );
}