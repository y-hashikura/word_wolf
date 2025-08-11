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
  const { playerNames, game } = useGameData();

  if (!game) return null;

  const wolfNames = playerNames.filter((name) => game.players[name]?.is_wolf);
  const villagerNames = playerNames.filter((name) => !game.players[name]?.is_wolf);

  return (
    <TopPageTemplate>
      <ResultPanel
        wolfNames={wolfNames}
        wolfTheme={game.wolf_theme}
        villagerNames={villagerNames}
        villagerTheme={game.village_theme}
        onBackToTop={onBackToTop}
      />
    </TopPageTemplate>
  );
}