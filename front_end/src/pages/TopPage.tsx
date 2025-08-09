/**
 * トップページ
 *
 * トップページを表示するためのページです。
 * 
 * Props:
 * - onNext: 次のページに遷移するときに呼ばれる関数
 */
import { useState } from "react";
import TopPageTemplate from "@/components/templates/PageTemplate";
import SettingsPanel from "@/components/organisms/TopPanel";
import Button from "@/components/atoms/Button";
import Popup from "@/components/atoms/Popup";
import { useGameSettings } from "@/context/GameSettingContext";

export default function TopPage({ onNext }: { onNext: () => void }) {
  const {
    playerCount, setPlayerCount,
    wolfCount, setWolfCount,
    talkTime, setTalkTime
  } = useGameSettings();

  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <TopPageTemplate>
      <SettingsPanel
        panelTitle="ゲーム設定"
        playerCount={playerCount}
        setPlayerCount={setPlayerCount}
        wolfCount={wolfCount}
        setWolfCount={setWolfCount}
        talkTime={talkTime}
        setTalkTime={setTalkTime}
      />
      <div className="flex flex-col items-center mt-8 gap-4">
      <Button onClick={onNext}>次へ</Button>
        <Button onClick={() => setPopupOpen(true)} style={{ background: "#e48b8b", color: "white" }}>
          遊び方を見る
        </Button>
      </div>
      <Popup open={popupOpen} onClose={() => setPopupOpen(false)}>
        <h2 className="text-2xl font-bold mb-4 text-[#e48b8b]">遊び方</h2>
        <p className="mb-6 text-gray-700">
          ワードウルフは、みんなでお題について話し合い、少数派（ウルフ）を推理する大人気パーティーゲームです。<br />
          各自に配られたお題をもとに会話し、誰がウルフかを当てましょう！
        </p>
      </Popup>
    </TopPageTemplate>
  );
}