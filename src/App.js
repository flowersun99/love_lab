import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [

  {
    question: "데이트가 없는 주말, 나는?",
    options: [
      "단톡에 연락해 친구들과 약속을 잡는다",
      "침대랑 하루종일 물아일체가 된다",
    ],
  },
  {
    question: "연인이 '우리 다음 데이트 어디서 할까?'라고 물어본다면 나의 대답은?",
    options: [
      "너 사는 곳 근처로 갈까? 맛집 추천해줘!",
      "내가 사는 곳으로 올래? 내가 맛있는거 사줄게!",
    ],
  },
  {
    question: "카카오톡으로 연인이 '자고 일어났는데 내가 바퀴벌레로 변했다고 한다면 어떻게 할거야?'라고 질문을 했을때 나의 대답은?",
    options: [
      "어떻게 다시 사람으로 돌릴 수 있을지 \n방법을 찾아볼게",
      "바퀴벌래라도 널 사랑하겠어...",
    ],
  },
  {
    question: "취업 준비 중인데 연인은 대기업 직장인이라면?",
    options: [
      "현실의 내 모습을 다시 보게 된다",
      "나도 같은 직장인이 된 모습을 상상한다",
    ],
  },
  {
    question: "결혼식을 준비하는데, 연인과 원하는 장소가 다르다면?",
    options: [
      "현실적으로 가능하면 맞춰준다.",
      "나만의 결혼식을 설득해본다.",
    ],
  },
  {
    question: "연인과 갈등이 생겼을 때 나는?",
    options: [
      "이성적으로 갈등을 해결하려고 노력한다.",
      "감정이 먼저 상해서 생각 정리가 안된다.",
    ],
  },
  {
    question: "학교, 직장에서 힘든 일을 겪고 너무 힘들어서 모든 연락을 끊고 있는 상황. 이때 나의 연인이 해줬으면 하는 반응은?",
    options: [
      "나의 상황을 객관적으로 보고, \n나아갈 방향을 알려주면 좋겠다.",
      "나의 상황을 공감해주고, 이해해주면 좋겠다.",
    ],
  },
  {
    question: `[ 연애패턴분석 ]
더 나은 연애와 인간관계를 위해, 당신의 데이터를 들려주세요!

연애는 감정만으로 이뤄지지 않습니다.
우리는 빅데이터를 기반으로 성향, 가치관, MBTI 등을 분석하여
연애와 인간관계의 패턴을 연구하고 있습니다.

"내 연애 패턴을 알면 더 좋은 관계를 만들 수 있을까?"
"사람들은 어떤 연애 고민을 가지고 있을까?"

여러분의 참여가 더 깊이 있는 연구로 이어집니다.
테스트에 참여하고, 더 나은 연애와 인간관계를 위한 데이터 연구에 함께해주세요!

참여자 전원에게 애플리케이션 무료 이용 쿠폰 증정합니다.`,
    options: [
      "분석 신청하기",
    ],
  },
];

function App() {
  const [showStart, setShowStart] = useState(true);
  const [step, setStep] = useState(0);
  const [showComplete, setShowComplete] = useState(false);
  const [contact, setContact] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleStart = () => setShowStart(false);

  const handleClick = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowComplete(true);
    }
  };

  // 이메일 전송 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setSent(false);
    try {
      const res = await fetch('https://srv-captain--harivzqpnc.qoddiapp.com/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact }),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
        setContact("");
        alert('제출이 완료되었습니다!');
      } else {
        alert('제출에 실패했습니다: ' + data.msg);
      }
    } catch (err) {
      alert('서버 오류: ' + err.message);
    }
    setSending(false);
  };

  const progress = ((step + 1) / questions.length) * 100;

  if (showStart) {
    // 시작 화면
    return (
      <div style={{
        minHeight: "100vh",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 8px 32px 8px",
      }}>
        {/* 상단 로고 */}
        <img src="https://ddstatic.net/1743049048113-0026583.png" alt="logo" style={{ marginTop: 32, width: 70, maxWidth: "28vw" }} />
        {/* 타이틀 */}
        <div style={{ marginTop: 40, textAlign: "center" }}>
          <div style={{ fontSize: 22, color: "#ef61ac", fontWeight: 600, marginBottom: 8 }}>
            LOVE CODE
          </div>
          <div style={{ fontSize: 13, color: "#0a2342", marginBottom: 32 }}>
            연애 심리 어플리케이션
          </div>
        </div>
        {/* START 버튼 */}
        <button
          onClick={handleStart}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: 240,
            margin: "24px auto 0 auto",
            padding: "10px 0",
            background: "#ef61ac",
            color: "#fff",
            border: "none",
            borderRadius: 30,
            fontSize: 15,
            fontWeight: 500,
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(239,97,172,0.15)",
            letterSpacing: 1
          }}
        >
          <span style={{ fontSize: 15, marginRight: 8 }}>❯</span> START
        </button>
      </div>
    );
  } else if (showComplete) {
    // 마지막 제출 완료 화면
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #ef61ac 0%, #fff 60%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "32px 8px 32px 8px",
      }}>
        <div style={{ fontSize: 24, color: "#fff", fontWeight: 700, marginTop: 48, marginBottom: 24 }}>
          제출 완료
        </div>
        <div style={{
          background: "#fff",
          borderRadius: 24,
          boxShadow: "0 6px 24px rgba(239,97,172,0.13)",
          width: "100%",
          maxWidth: 340,
          padding: 20,
          textAlign: "center",
          marginBottom: 24
        }}>
          <div style={{ fontSize: 16, color: "#ef61ac", fontWeight: 600, marginBottom: 8 }}>
            제출 완료
          </div>
          <hr style={{ border: "none", borderTop: "2px solid #ef61ac", width: 50, margin: "12px auto" }} />
          <div style={{ fontSize: 13, color: "#222", marginBottom: 16 }}>
            결과페이지 내용을 입력하여 주세요.<br /><br />
            <b>더 자세한 상담을 원하신다면<br />휴대폰 번호나 카카오톡 아이디를 알려주세요!</b>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="휴대폰 번호 또는 카카오톡 아이디"
              value={contact}
              onChange={e => setContact(e.target.value)}
              style={{
                width: "96%",
                padding: "8px",
                borderRadius: 8,
                border: "1px solid #ef61ac",
                marginBottom: 14,
                fontSize: 13
              }}
              required
              disabled={sending || sent}
            />
            <br />
            <button
              type="submit"
              style={{
                width: "100%",
                maxWidth: 240,
                padding: "10px 0",
                background: "#ef61ac",
                color: "#fff",
                border: "none",
                borderRadius: 30,
                fontSize: 14,
                fontWeight: 500,
                cursor: sending || sent ? "not-allowed" : "pointer",
                marginBottom: 6
              }}
              disabled={sending || sent}
            >
              {sending ? "제출 중..." : sent ? "제출 완료!" : "제출하기"}
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    // 설문 진행 화면
    return (
      <div style={{
        minHeight: "100vh",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "32px 8px 32px 8px",
      }}>
        {/* 상단 로고 */}
        <img src="https://ddstatic.net/1743049048113-0026583.png" alt="logo" style={{ marginTop: 32, width: 70, maxWidth: "28vw" }} />
        {/* 진행률 바 */}
        <div style={{ width: "100%", maxWidth: 340, margin: "24px auto 0 auto" }}>
          <div style={{ fontSize: 12, color: "#888", textAlign: "right" }}>
            {step + 1} / {questions.length}
          </div>
          <div style={{
            width: "100%",
            height: 8,
            background: "#eee",
            borderRadius: 8,
            overflow: "hidden",
            marginTop: 3
          }}>
            <div style={{
              width: `${progress}%`,
              height: "100%",
              background: "#ef61ac",
              transition: "width 0.3s"
            }} />
          </div>
        </div>
        {/* 질문 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ marginTop: 28, textAlign: "center" }}
          >
            <div style={{ fontSize: 17, color: "#ef61ac", fontWeight: 600, marginBottom: 10 }}>
              Q{step + 1}.
            </div>
            <div style={{
              fontSize: 13,
              color: "#444",
              marginBottom: 36,
              whiteSpace: "pre-line",
              maxWidth: 320,
              margin: "0 auto 36px auto"
            }}>
              {questions[step].question.split('\n').map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </div>
            {/* 선택지 버튼 */}
            {questions[step].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (opt === "분석 신청하기") {
                    setShowComplete(true);
                  } else {
                    handleClick();
                  }
                }}
                style={{
                  display: "block",
                  width: "100%",
                  maxWidth: 240,
                  margin: "24px auto",
                  padding: "10px 0",
                  background: "#ef61ac",
                  color: "#fff",
                  border: "none",
                  borderRadius: 30,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(239,97,172,0.08)",
                  wordBreak: "keep-all",
                  whiteSpace: "pre-line"
                }}
              >
                {opt}
              </button>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }
}

export default App;