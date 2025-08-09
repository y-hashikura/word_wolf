import { useState } from "react";
import TopPage from "./pages/TopPage";
import UserInputPage from "./pages/UserInputPage";
import UserConfirmPage from "./pages/UserConfirmPage";
import { GameSettingsProvider } from "./context/GameSettingContext";
import { GameDataProvider } from "./context/GameDataContext";
import GameStartPage from "./pages/GameStartPage";
import TalkEndPage from "./pages/TalkEndPage";
import ResultPage from "./pages/ResultPage";

export default function App() {
  const [page, setPage] = useState<"top" | "userInput" | "userConfirm" | "gameStart" | "talkEnd" | "result">("top");

  return (
    <GameSettingsProvider>
      <GameDataProvider>
      {page === "top" && (
          <TopPage onNext={() => setPage("userInput")} />
        )}
        {page === "userInput" && (
          <UserInputPage
            onBack={() => setPage("top")}
            onNext={() => setPage("userConfirm")}
          />
        )}
        {page === "userConfirm" && (
          <UserConfirmPage
            onAllConfirmed={() => setPage("gameStart")}
          />
        )}
        {page === "gameStart" && (
          <GameStartPage
            onTalkEnd={() => setPage("talkEnd")}
          />
        )}
        {page === "talkEnd" && (
          <TalkEndPage
            onShowResult={() => setPage("result")}
          />
        )}
        {page === "result" && (
          <ResultPage
            onBackToTop={() => setPage("top")}
          />
        )}
      </GameDataProvider>
    </GameSettingsProvider>
  );
}