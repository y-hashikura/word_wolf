/**
 * タイトルコンポーネント
 *
 * タイトルを表示するためのUI部品です。
 * 
 * Props:
 * - children: タイトルの中身（テキストやアイコンなど）
 */
export default function Title() {
    return (
      <h1 className="text-5xl font-bold text-white mt-12 mb-2 drop-shadow">
        ワードウルフ
      </h1>
    );
  }