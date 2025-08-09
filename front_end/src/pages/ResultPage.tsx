/**
 * 結果ページ
 *
 * 結果ページを表示するためのページです。
 * 
 * Props:
 * - onBackToTop: TOPに戻るときに呼ばれる関数
 */
import TopPageTemplate from "@/components/templates/PageTemplate";
import ResultPanel from "@/components/organisms/ResultPanel";
import { useGameData } from "@/context/GameDataContext";

// ここではquestions配列の中で「ウルフのお題」と「村人のお題」を判定
export default function ResultPage({ onBackToTop }: { onBackToTop: () => void }) {
  const { playerNames, questions } = useGameData();

  // ウルフと村人を分ける
  const wolfTheme = questions.find(q => q !== "村人のお題") || "";
  const villagerTheme = questions.find(q => q === "村人のお題") || "";
  const wolfIndex = questions.findIndex(q => q !== "村人のお題");
  const wolfName = playerNames[wolfIndex];
  const villagerNames = playerNames.filter((_, i) => i !== wolfIndex);

  return (
    <TopPageTemplate>
      <ResultPanel
        wolfName={wolfName}
        wolfTheme={wolfTheme}
        villagerNames={villagerNames}
        villagerTheme={villagerTheme}
        onBackToTop={onBackToTop}
      />
    </TopPageTemplate>
  );
}