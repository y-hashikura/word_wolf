/**
 * ゲーム開始パネルコンポーネント
 *
 * ゲーム開始パネルを表示するためのUI部品です。
 * 
 * Props:
 * - started: ゲームが開始されたかどうか
 * - onStart: ゲームを開始するときに呼ばれる関数
 * - onForceEnd: ゲームを強制的に終了するときに呼ばれる関数
 * - timeLeft: 残り時間（秒）
 */
import PanelTitle from "@/components/atoms/PanelTitle";
import QuestionLabel from "@/components/atoms/QuestionLabel";
import Button from "@/components/atoms/Button";

type Props = {
  started: boolean;
  onStart: () => void;
  onForceEnd: () => void;
  timeLeft: number;
};

export default function GameStartPanel({ started, onStart, onForceEnd, timeLeft }: Props) {
  return (
    <div className="bg-[#faf5e6] rounded-2xl p-6 flex flex-col gap-4 w-96 max-w-full mx-auto items-center">
      <PanelTitle>ゲーム開始</PanelTitle>
      {!started ? (
        <>
          <QuestionLabel>全員の確認が完了しました。</QuestionLabel>
          <Button onClick={onStart}>ゲーム開始</Button>
        </>
      ) : (
        <>
          <QuestionLabel>トークしてください。</QuestionLabel>
          <TimerCircle timeLeft={timeLeft} />
          <Button onClick={onForceEnd}>強制終了する</Button>
        </>
      )}
    </div>
  );
}

// タイマー円グラフ
function TimerCircle({ timeLeft }: { timeLeft: number }) {
  const total = 180; // 例: 3分
  const percent = timeLeft / total;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference * (1 - percent);
  const min = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const sec = String(timeLeft % 60).padStart(2, '0');
  return (
    <svg width="150" height="150" className="mb-4">
      <circle
        cx="75"
        cy="75"
        r={radius}
        stroke="#fff"
        strokeWidth="12"
        fill="none"
        opacity="0.2"
      />
      <circle
        cx="75"
        cy="75"
        r={radius}
        stroke="#fff"
        strokeWidth="12"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={dashoffset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1s linear' }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="32"
        fill="#fff"
        fontWeight="bold"
      >
        {min}:{sec}
      </text>
    </svg>
  );
}