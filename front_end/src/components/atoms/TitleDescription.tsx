/**
 * タイトル説明コンポーネント
 *
 * タイトルの説明を表示するためのUI部品です。
 * 
 * Props:
 * - children: タイトルの説明（テキストやアイコンなど）
 */
export default function TitleDescription() {
    return (
      <p className="text-xl font-bold text-white mb-8 drop-shadow">
        〜推理ゲーム〜
      </p>
    );
  }