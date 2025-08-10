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
  const { playerNames, playerInfoByName, villageTheme, wolfTheme } = useGameData();

  const wolfName = playerNames.find(name => playerInfoByName[name]?.is_wolf) || "";
  const villagerNames = playerNames.filter(name => !playerInfoByName[name]?.is_wolf);
  const villagerTheme = villageTheme;

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