/**
 * トーク終了ページ
 *
 * トーク終了ページを表示するためのページです。
 * 
 * Props:
 * - onShowResult: 結果を表示するときに呼ばれる関数
 */
import TopPageTemplate from "@/components/templates/PageTemplate";
import TalkEndPanel from "@/components/organisms/TalkEndPanel";

export default function TalkEndPage({ onShowResult }: { onShowResult: () => void }) {
  return (
    <TopPageTemplate>
      <TalkEndPanel onShowResult={onShowResult} />
    </TopPageTemplate>
  );
}