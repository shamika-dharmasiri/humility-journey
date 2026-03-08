import { useState } from "react";

const QUIZ_QUESTIONS = [
  { id: 1, text: "When I make a mistake, I find it easy to admit it to others.", category: "Self-Awareness" },
  { id: 2, text: "I genuinely enjoy celebrating other people's successes.", category: "Others-Focused" },
  { id: 3, text: "I often seek feedback even when it might be critical.", category: "Growth" },
  { id: 4, text: "I can hold a conversation without steering it back to myself.", category: "Presence" },
  { id: 5, text: "I acknowledge when someone else knows more than me.", category: "Intellectual Humility" },
  { id: 6, text: "I don't need external validation to feel confident.", category: "Self-Worth" },
  { id: 7, text: "I treat service workers and strangers with the same respect as authority figures.", category: "Equality" },
  { id: 8, text: "I can accept being wrong without feeling personally attacked.", category: "Resilience" },
  { id: 9, text: "I give credit to others rather than taking it for shared work.", category: "Others-Focused" },
  { id: 10, text: "I can listen to someone fully without planning my response.", category: "Presence" },
  { id: 11, text: "I recognize that my worldview is shaped by luck, timing, and circumstance.", category: "Self-Awareness" },
  { id: 12, text: "I rarely feel the need to impress people with my achievements.", category: "Self-Worth" },
  { id: 13, text: "I'm curious about ideas that challenge my existing beliefs.", category: "Intellectual Humility" },
  { id: 14, text: "I can perform acts of kindness without needing recognition.", category: "Kindness" },
  { id: 15, text: "I treat people differently based on what they can do for me.", category: "Equality", reverse: true },
];

const CHALLENGE_DAYS = [
  { day: 1, theme: "Silence & Listening", prompt: "Today, in every conversation, speak 30% less than usual. Focus entirely on understanding the other person. Journal: What did you notice when you truly listened?", micro: "Let someone else finish their thought completely before you respond." },
  { day: 2, theme: "Credit Giving", prompt: "Actively give credit to 3 people today for something they contributed to your life or work. Be specific. Journal: How did it feel to say it out loud?", micro: "Send one message thanking someone whose help you've never acknowledged." },
  { day: 3, theme: "The Admission", prompt: "Admit a mistake or a gap in your knowledge to someone today — don't soften it. Journal: What was your fear before admitting it? What happened after?", micro: "Say 'I was wrong about that' once today, without adding 'but'." },
  { day: 4, theme: "Beginner's Mind", prompt: "Approach one familiar task as if you've never done it before. Ask questions a beginner would ask. Journal: What did you discover by pretending not to know?", micro: "Ask someone to explain something you think you already understand." },
  { day: 5, theme: "Invisible Kindness", prompt: "Do one act of service or kindness today that no one will ever know you did. Journal: How did it feel to help without being seen?", micro: "Clean up something that isn't yours to clean up." },
  { day: 6, theme: "Equal Respect", prompt: "Pay conscious attention to how you treat every single person today — the cashier, the executive, the stranger. Journal: Did you notice any difference in how you showed up? Why?", micro: "Learn the name of one service worker you see regularly." },
  { day: 7, theme: "Week 1 Reflection", prompt: "Look back at the past 6 days. Journal: Where did humility come naturally? Where did ego sneak in? What pattern do you notice about yourself?", micro: "Write one thing you're genuinely proud of — without comparing it to anyone else." },
  { day: 8, theme: "Feedback Invitation", prompt: "Ask one trusted person: 'What's one blind spot you think I have?' Listen without defending. Journal: What did they say? How did it land?", micro: "Say 'thank you for telling me that' the next time someone gives you criticism." },
  { day: 9, theme: "Curiosity Over Opinion", prompt: "In every discussion today, lead with a question instead of your opinion. Journal: What did you learn that you wouldn't have if you had spoken first?", micro: "Before sharing a view, ask yourself: 'Do I actually need to share this?'" },
  { day: 10, theme: "The Luck Inventory", prompt: "List 10 things in your life that you didn't earn — things that came from luck, timing, who you were born to, or where. Journal: How does this shift your sense of personal achievement?", micro: "Acknowledge one privilege you benefit from but rarely think about." },
  { day: 11, theme: "No Complaints", prompt: "Go the entire day without complaining — not out loud, and not in your head. Journal: What triggers the urge to complain? What's underneath it?", micro: "Replace one complaint with a genuine observation or gratitude." },
  { day: 12, theme: "The Quiet Achievement", prompt: "Do your best work today without mentioning it to anyone. Don't post it, don't hint at it. Journal: How strong was the urge to share? What does that tell you?", micro: "Resist one opportunity to mention your own accomplishment." },
  { day: 13, theme: "Disagreement with Grace", prompt: "Find an opportunity to disagree with someone — and do it gently, with genuine curiosity. Journal: How did staying curious change the conversation?", micro: "Say 'that's an interesting perspective' and mean it." },
  { day: 14, theme: "Week 2 Reflection", prompt: "Review this week's entries. Journal: What is humility costing you right now? What is it giving you? Is the trade-off worth it?", micro: "Identify one relationship that would improve if you showed up with more humility." },
  { day: 15, theme: "Service Day", prompt: "Volunteer your time, help a neighbor, or support someone without being asked. Do it without expectation. Journal: How did serving others affect your sense of self?", micro: "Offer to help with one task someone finds difficult — without making them ask." },
  { day: 16, theme: "Undefended Listening", prompt: "Ask someone about their life experience that is very different from yours. Listen without redirecting to your own story. Journal: What surprised you about their world?", micro: "Ask one follow-up question before making any statement." },
  { day: 17, theme: "The Inner Critic Fast", prompt: "Today, avoid judging others in your thoughts. When a judgment arises, replace it with curiosity. Journal: How often did judgment arise? What was the feeling underneath it?", micro: "When you feel superior to someone, ask: what am I not seeing about them?" },
  { day: 18, theme: "Receiving Gracefully", prompt: "When someone compliments you today, simply say 'thank you' — no deflecting, no returning it immediately. Journal: Why is it hard to receive without deflecting?", micro: "Accept one compliment fully, without qualifying it." },
  { day: 19, theme: "The Apology", prompt: "Think of one person you owe an apology — big or small. Write the apology, whether or not you send it. Journal: What has holding it back cost you both?", micro: "Say sorry for something small today, cleanly and directly." },
  { day: 20, theme: "Slow Opinions", prompt: "Today, form no strong opinions until you've heard the full picture. Journal: When did you catch yourself jumping to conclusions? What did slowing down reveal?", micro: "Before a meeting or conversation, remind yourself: 'I might be missing something.'" },
  { day: 21, theme: "Week 3 Reflection", prompt: "Three weeks in. Journal: How has your relationship with your ego shifted? What do others seem to be experiencing around you now?", micro: "Ask someone close to you: 'Have you noticed any change in me lately?'" },
  { day: 22, theme: "Learning from Below", prompt: "Find wisdom today from someone younger, less experienced, or in a lower position. Take a note from their perspective. Journal: What did you learn from someone you might have dismissed before?", micro: "Ask a child or newcomer how they see something. Take their answer seriously." },
  { day: 23, theme: "The Comparison Detox", prompt: "Every time you compare yourself to someone today, redirect to: 'What can I learn from them?' Journal: What does comparison feel like in your body? What need does it try to fill?", micro: "Replace 'I wish I had what they have' with 'I wonder what their journey looked like.'" },
  { day: 24, theme: "The Full Presence", prompt: "In each conversation today, put your phone away completely. Journal: What did people reveal to you when they felt fully heard?", micro: "Make eye contact and don't glance away for the duration of one conversation." },
  { day: 25, theme: "Sharing the Stage", prompt: "Actively create space for quieter voices today — in meetings, in groups, in conversations. Journal: Whose voice emerged that you might have drowned out before?", micro: "Ask a quiet person in a group what they think, and make space for their answer." },
  { day: 26, theme: "The Open Hand", prompt: "Give something today — your time, your resources, your skills — without expecting a return. Journal: What is the difference between giving from abundance vs. giving from fear?", micro: "Offer something of value with no strings attached." },
  { day: 27, theme: "Releasing the Need to Win", prompt: "Find a moment today where being right matters less than being connected. Let it go. Journal: What did you 'lose' by not winning the argument? What did you gain?", micro: "In one disagreement, choose the relationship over the point." },
  { day: 28, theme: "Week 4 Reflection", prompt: "Journal: What version of yourself started this challenge? Who are you now? What specific moment over these 28 days stands out the most?", micro: "Write one letter of appreciation — to yourself, for doing this work." },
  { day: 29, theme: "The Legacy Question", prompt: "Reflect: When people remember you, what do you want them to feel? Are your daily actions aligned with that? Journal: What one change would make your presence feel more like a gift to others?", micro: "Do one thing today that future-you would be proud of." },
  { day: 30, theme: "Full Circle", prompt: "Retake the Humility Assessment. Journal: Compare who you were on Day 1 to today. What changed? What still needs work? What will you carry forward? Commit to one habit.", micro: "Share what you've learned with one person who might benefit from it." },
];

const SCORE_LEVELS = [
  { min: 0, max: 30, label: "Room to Grow", color: "#e07b54", desc: "Humility is a muscle you haven't trained much yet — and that's okay. The fact that you're here means you're already ahead. The next 30 days will be transformative." },
  { min: 31, max: 50, label: "Emerging Awareness", color: "#d4a843", desc: "You have genuine moments of humility, but ego patterns still run the show often. You're aware enough to catch yourself — now it's about building consistency." },
  { min: 51, max: 65, label: "Grounded Presence", color: "#6aab8e", desc: "You practice humility in meaningful ways. You listen, you give credit, and you're open to growth. The deeper work now is in the subtle patterns you don't yet see." },
  { min: 66, max: 75, label: "Quietly Powerful", color: "#4a90b8", desc: "Humility is a natural part of how you move through the world. People feel safe and seen around you. The 30-day challenge will sharpen and deepen what you already carry." },
];

export default function HumilityApp() {
  const [screen, setScreen] = useState("home"); // home, quiz, results, challenge, journal
  const [answers, setAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const handleAnswer = (qId, value) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const calculateScore = () => {
    let total = 0;
    QUIZ_QUESTIONS.forEach(q => {
      const val = answers[q.id] || 3;
      total += q.reverse ? (6 - val) : val;
    });
    return total;
  };

  const submitQuiz = () => {
    setQuizScore(calculateScore());
    setScreen("results");
  };

  const getScoreLevel = (score) => {
    return SCORE_LEVELS.find(l => score >= l.min && score <= l.max) || SCORE_LEVELS[0];
  };

  const openDay = (day) => {
    setSelectedDay(day);
    setScreen("journal");
  };


  const styles = {
    app: {
      minHeight: "100vh",
      background: "#0f0e0c",
      color: "#e8e0d4",
      fontFamily: "'Georgia', 'Palatino Linotype', serif",
      overflowX: "hidden",
    },
    nav: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px 32px",
      borderBottom: "1px solid #2a2825",
      background: "#0f0e0c",
      position: "sticky",
      top: 0,
      zIndex: 10,
    },
    navLogo: {
      fontSize: "15px",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "#c4a96b",
      fontFamily: "'Georgia', serif",
    },
    navLinks: {
      display: "flex",
      gap: "24px",
    },
    navBtn: {
      background: "none",
      border: "none",
      color: "#9a8f80",
      cursor: "pointer",
      fontSize: "13px",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      transition: "color 0.2s",
      fontFamily: "'Georgia', serif",
    },
    container: {
      maxWidth: "760px",
      margin: "0 auto",
      padding: "60px 24px",
    },
    hero: {
      textAlign: "center",
      padding: "80px 24px 60px",
    },
    eyebrow: {
      fontSize: "11px",
      letterSpacing: "0.3em",
      textTransform: "uppercase",
      color: "#c4a96b",
      marginBottom: "20px",
    },
    heroTitle: {
      fontSize: "clamp(36px, 6vw, 64px)",
      fontWeight: "400",
      lineHeight: "1.15",
      color: "#f0e8dc",
      marginBottom: "24px",
      fontStyle: "italic",
    },
    heroSub: {
      fontSize: "17px",
      color: "#8a7f72",
      lineHeight: "1.7",
      maxWidth: "520px",
      margin: "0 auto 48px",
    },
    quote: {
      borderLeft: "2px solid #c4a96b",
      paddingLeft: "24px",
      margin: "48px auto",
      maxWidth: "520px",
      textAlign: "left",
      color: "#a89880",
      fontStyle: "italic",
      fontSize: "16px",
      lineHeight: "1.7",
    },
    cardRow: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
      maxWidth: "640px",
      margin: "0 auto",
    },
    card: {
      background: "#1a1916",
      border: "1px solid #2d2b28",
      borderRadius: "4px",
      padding: "32px 28px",
      cursor: "pointer",
      transition: "border-color 0.25s, transform 0.25s",
      textAlign: "left",
    },
    cardIcon: { fontSize: "28px", marginBottom: "16px" },
    cardTitle: { fontSize: "16px", color: "#e0d8cc", marginBottom: "8px", fontWeight: "600" },
    cardDesc: { fontSize: "13px", color: "#6e6560", lineHeight: "1.6" },
    primaryBtn: {
      background: "#c4a96b",
      color: "#0f0e0c",
      border: "none",
      padding: "14px 36px",
      fontSize: "13px",
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      cursor: "pointer",
      fontFamily: "'Georgia', serif",
      borderRadius: "2px",
      transition: "background 0.2s",
    },
    ghostBtn: {
      background: "none",
      color: "#c4a96b",
      border: "1px solid #3d3830",
      padding: "12px 28px",
      fontSize: "13px",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      cursor: "pointer",
      fontFamily: "'Georgia', serif",
      borderRadius: "2px",
    },
    sectionTitle: {
      fontSize: "28px",
      fontWeight: "400",
      color: "#f0e8dc",
      marginBottom: "8px",
      fontStyle: "italic",
    },
    sectionSub: { fontSize: "14px", color: "#7a6e64", lineHeight: "1.6", marginBottom: "40px" },
    question: {
      background: "#1a1916",
      border: "1px solid #2d2b28",
      borderRadius: "4px",
      padding: "28px",
      marginBottom: "16px",
    },
    qText: { fontSize: "16px", color: "#ddd5c8", lineHeight: "1.6", marginBottom: "20px" },
    qCategory: { fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c4a96b", marginBottom: "12px" },
    scaleRow: { display: "flex", gap: "8px", alignItems: "center" },
    scaleLabel: { fontSize: "11px", color: "#5a5048", flex: "0 0 auto" },
    scaleBtns: { display: "flex", gap: "6px", flex: 1, justifyContent: "center" },
    scaleBtn: (active) => ({
      width: "36px", height: "36px",
      borderRadius: "50%",
      border: active ? "none" : "1px solid #3d3830",
      background: active ? "#c4a96b" : "transparent",
      color: active ? "#0f0e0c" : "#7a6e64",
      cursor: "pointer",
      fontSize: "13px",
      transition: "all 0.15s",
      fontFamily: "'Georgia', serif",
    }),
    resultsCard: {
      background: "#1a1916",
      border: "1px solid #2d2b28",
      borderRadius: "4px",
      padding: "40px",
      textAlign: "center",
      marginBottom: "32px",
    },
    scoreNum: (color) => ({
      fontSize: "80px",
      fontWeight: "300",
      color: color,
      lineHeight: 1,
      marginBottom: "8px",
      fontStyle: "italic",
    }),
    scoreMax: { fontSize: "18px", color: "#5a5048" },
    scoreLabel: (color) => ({
      fontSize: "22px",
      color: color,
      marginBottom: "16px",
      letterSpacing: "0.05em",
    }),
    scoreDesc: { fontSize: "15px", color: "#8a7f72", lineHeight: "1.7", maxWidth: "480px", margin: "0 auto" },
    progressBar: {
      background: "#2a2825",
      height: "4px",
      borderRadius: "2px",
      marginBottom: "40px",
      overflow: "hidden",
    },
    progressFill: (pct, color) => ({
      height: "100%",
      width: `${pct}%`,
      background: color || "#c4a96b",
      borderRadius: "2px",
      transition: "width 0.6s ease",
    }),
    dayGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(6, 1fr)",
      gap: "8px",
      marginBottom: "40px",
    },
    dayCell: (done, current) => ({
      aspectRatio: "1",
      borderRadius: "3px",
      border: current ? "2px solid #c4a96b" : done ? "none" : "1px solid #2a2825",
      background: done ? "#c4a96b22" : current ? "#1e1c18" : "#15140f",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "11px",
      color: done ? "#c4a96b" : current ? "#c4a96b" : "#3d3830",
      transition: "all 0.15s",
      position: "relative",
    }),
    dayDetail: {
      background: "#1a1916",
      border: "1px solid #2d2b28",
      borderRadius: "4px",
      padding: "40px",
      marginBottom: "24px",
    },
    dayNum: { fontSize: "11px", letterSpacing: "0.3em", color: "#c4a96b", textTransform: "uppercase", marginBottom: "8px" },
    dayTheme: { fontSize: "26px", fontStyle: "italic", color: "#f0e8dc", marginBottom: "24px" },
    promptText: { fontSize: "15px", color: "#a89880", lineHeight: "1.75", marginBottom: "24px" },
    microLabel: { fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#5a5048", marginBottom: "8px" },
    microText: { fontSize: "14px", color: "#7a6e64", fontStyle: "italic", lineHeight: "1.6", padding: "16px", background: "#141310", borderRadius: "3px", borderLeft: "2px solid #2a2825" },
    textarea: {
      width: "100%",
      minHeight: "180px",
      background: "#141310",
      border: "1px solid #2d2b28",
      borderRadius: "3px",
      padding: "20px",
      color: "#c8bfb0",
      fontSize: "15px",
      lineHeight: "1.7",
      fontFamily: "'Georgia', serif",
      resize: "vertical",
      outline: "none",
      boxSizing: "border-box",
      marginBottom: "16px",
    },
    notepadCard: {
      background: "#141310",
      border: "1px solid #2d2b28",
      borderRadius: "4px",
      padding: "28px 32px",
      marginTop: "8px",
    },
    notepadTitle: { fontSize: "15px", color: "#e0d8cc", marginBottom: "10px", fontWeight: "600" },
    notepadBody: { fontSize: "14px", color: "#7a6e64", lineHeight: "1.75", marginBottom: "20px" },
    notepadApps: { display: "flex", flexWrap: "wrap", gap: "8px" },
    notepadApp: {
      background: "#1e1c18",
      border: "1px solid #2d2b28",
      borderRadius: "3px",
      padding: "6px 14px",
      fontSize: "12px",
      color: "#a89880",
      letterSpacing: "0.05em",
    },
  };

  const allAnswered = QUIZ_QUESTIONS.every(q => answers[q.id]);
  const level = quizScore !== null ? getScoreLevel(quizScore) : null;

  if (screen === "quiz") {
    return (
      <div style={styles.app}>
        <nav style={styles.nav}>
          <span style={styles.navLogo}>Humility Journey</span>
          <button style={styles.navBtn} onClick={() => setScreen("home")}>← Back</button>
        </nav>
        <div style={styles.container}>
          <div style={{ marginBottom: "40px" }}>
            <p style={styles.eyebrow}>Self-Assessment</p>
            <h2 style={styles.sectionTitle}>The Humility Quiz</h2>
            <p style={styles.sectionSub}>Rate each statement honestly. 1 = Strongly Disagree, 5 = Strongly Agree. There are no right answers — only honest ones.</p>
            <div style={styles.progressBar}>
              <div style={styles.progressFill(Math.round((Object.keys(answers).length / 15) * 100))} />
            </div>
          </div>

          {QUIZ_QUESTIONS.map((q, i) => (
            <div key={q.id} style={styles.question}>
              <p style={styles.qCategory}>{q.category}</p>
              <p style={styles.qText}>{i + 1}. {q.text}</p>
              <div style={styles.scaleRow}>
                <span style={styles.scaleLabel}>Disagree</span>
                <div style={styles.scaleBtns}>
                  {[1,2,3,4,5].map(v => (
                    <button key={v} style={styles.scaleBtn(answers[q.id] === v)} onClick={() => handleAnswer(q.id, v)}>{v}</button>
                  ))}
                </div>
                <span style={styles.scaleLabel}>Agree</span>
              </div>
            </div>
          ))}

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <button
              style={{ ...styles.primaryBtn, opacity: allAnswered ? 1 : 0.4, cursor: allAnswered ? "pointer" : "default" }}
              onClick={allAnswered ? submitQuiz : undefined}
            >
              Reveal My Score
            </button>
            {!allAnswered && <p style={{ ...styles.sectionSub, marginTop: "12px", marginBottom: 0 }}>Answer all {15 - Object.keys(answers).length} remaining questions</p>}
          </div>
        </div>
      </div>
    );
  }

  if (screen === "results") {
    return (
      <div style={styles.app}>
        <nav style={styles.nav}>
          <span style={styles.navLogo}>Humility Journey</span>
          <button style={styles.navBtn} onClick={() => setScreen("home")}>← Home</button>
        </nav>
        <div style={styles.container}>
          <p style={{ ...styles.eyebrow, textAlign: "center" }}>Your Results</p>
          <div style={styles.resultsCard}>
            <div style={styles.scoreNum(level.color)}>{quizScore}</div>
            <div style={styles.scoreMax}>/75</div>
            <div style={{ height: "24px" }} />
            <h3 style={styles.scoreLabel(level.color)}>{level.label}</h3>
            <p style={styles.scoreDesc}>{level.desc}</p>
          </div>

          <div style={{ background: "#1a1916", border: "1px solid #2d2b28", borderRadius: "4px", padding: "32px", marginBottom: "32px" }}>
            <p style={{ ...styles.eyebrow, marginBottom: "20px" }}>Score Breakdown by Category</p>
            {["Self-Awareness", "Others-Focused", "Growth", "Presence", "Intellectual Humility", "Self-Worth", "Equality", "Resilience", "Kindness"].map(cat => {
              const catQs = QUIZ_QUESTIONS.filter(q => q.category === cat);
              const catScore = catQs.reduce((sum, q) => {
                const val = answers[q.id] || 3;
                return sum + (q.reverse ? (6 - val) : val);
              }, 0);
              const catMax = catQs.length * 5;
              const pct = Math.round((catScore / catMax) * 100);
              return (
                <div key={cat} style={{ marginBottom: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ fontSize: "13px", color: "#a89880" }}>{cat}</span>
                    <span style={{ fontSize: "12px", color: "#5a5048" }}>{catScore}/{catMax}</span>
                  </div>
                  <div style={{ background: "#2a2825", height: "3px", borderRadius: "2px" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: pct >= 70 ? "#6aab8e" : pct >= 50 ? "#c4a96b" : "#e07b54", borderRadius: "2px" }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div style={styles.quote}>
            "Humility is not thinking less of yourself, it's thinking of yourself less."<br />
            <span style={{ fontSize: "13px", color: "#5a5048" }}>— C.S. Lewis</span>
          </div>

          <div style={{ textAlign: "center", display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <button style={styles.primaryBtn} onClick={() => { setChallengeStarted(true); setScreen("challenge"); }}>
              Start 30-Day Challenge →
            </button>
            <button style={styles.ghostBtn} onClick={() => setScreen("home")}>Back to Home</button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "challenge") {
    return (
      <div style={styles.app}>
        <nav style={styles.nav}>
          <span style={styles.navLogo}>Humility Journey</span>
          <div style={styles.navLinks}>
            {quizScore !== null && <button style={styles.navBtn} onClick={() => setScreen("results")}>Results</button>}
            <button style={styles.navBtn} onClick={() => setScreen("home")}>Home</button>
          </div>
        </nav>
        <div style={styles.container}>
          <p style={styles.eyebrow}>30-Day Challenge</p>
          <h2 style={styles.sectionTitle}>Your Daily Practice</h2>
          <p style={styles.sectionSub}>Click any day to open its prompt and journaling guidance. Work through them one day at a time.</p>

          <div style={styles.dayGrid}>
            {CHALLENGE_DAYS.map(day => (
              <div
                key={day.day}
                style={{
                  aspectRatio: "1",
                  borderRadius: "3px",
                  border: "1px solid #2a2825",
                  background: "#15140f",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "11px",
                  color: "#5a5048",
                  transition: "all 0.15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#c4a96b"; e.currentTarget.style.color = "#c4a96b"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a2825"; e.currentTarget.style.color = "#5a5048"; }}
                onClick={() => openDay(day)}
                title={`Day ${day.day}: ${day.theme}`}
              >
                {day.day}
              </div>
            ))}
          </div>

          <div>
            {CHALLENGE_DAYS.slice(0, 7).map(day => (
              <div
                key={day.day}
                style={{ ...styles.dayDetail, cursor: "pointer", marginBottom: "12px", padding: "24px 28px" }}
                onClick={() => openDay(day)}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <p style={styles.dayNum}>Day {day.day}</p>
                    <h3 style={{ ...styles.dayTheme, fontSize: "18px", marginBottom: "8px" }}>{day.theme}</h3>
                    <p style={{ ...styles.promptText, fontSize: "13px", marginBottom: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{day.prompt.split(".")[0]}.</p>
                  </div>
                  <span style={{ color: "#3d3830", fontSize: "20px", marginLeft: "16px", flexShrink: 0 }}>→</span>
                </div>
              </div>
            ))}
            <button style={{ ...styles.ghostBtn, width: "100%", marginTop: "8px" }} onClick={() => {
              const el = document.getElementById("all-days");
              if (el) el.style.display = el.style.display === "none" ? "block" : "none";
            }}>
              Show All 30 Days
            </button>
            <div id="all-days" style={{ display: "none" }}>
              {CHALLENGE_DAYS.slice(7).map(day => (
                <div
                  key={day.day}
                  style={{ ...styles.dayDetail, cursor: "pointer", marginBottom: "12px", padding: "24px 28px", marginTop: "12px" }}
                  onClick={() => openDay(day)}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <p style={styles.dayNum}>Day {day.day}</p>
                      <h3 style={{ ...styles.dayTheme, fontSize: "18px", marginBottom: "8px" }}>{day.theme}</h3>
                      <p style={{ ...styles.promptText, fontSize: "13px", marginBottom: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{day.prompt.split(".")[0]}.</p>
                    </div>
                    <span style={{ color: "#3d3830", fontSize: "20px", marginLeft: "16px", flexShrink: 0 }}>→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "journal" && selectedDay) {
    return (
      <div style={styles.app}>
        <nav style={styles.nav}>
          <span style={styles.navLogo}>Humility Journey</span>
          <button style={styles.navBtn} onClick={() => setScreen("challenge")}>← All Days</button>
        </nav>
        <div style={styles.container}>
          <div style={styles.dayDetail}>
            <p style={styles.dayNum}>Day {selectedDay.day} · {selectedDay.theme}</p>
            <h2 style={styles.dayTheme}>{selectedDay.theme}</h2>
            <p style={styles.promptText}>{selectedDay.prompt}</p>
            <p style={styles.microLabel}>Today's Micro-Practice</p>
            <p style={styles.microText}>{selectedDay.micro}</p>
          </div>

          <div>
            <p style={{ ...styles.eyebrow, marginBottom: "12px" }}>Your Journal Prompt</p>
            <div style={styles.notepadCard}>
              <div style={{ fontSize: "28px", marginBottom: "16px" }}>📓</div>
              <p style={styles.notepadTitle}>Write this in your favourite notepad</p>
              <p style={styles.notepadBody}>
                Your reflections are yours alone — private, honest, and most powerful when written by hand or in a tool you already trust.
                Open your preferred app, create a new entry titled <em>"Day {selectedDay.day} — {selectedDay.theme}"</em>, and write freely using the prompt above.
              </p>
              <p style={{ ...styles.microLabel, marginBottom: "10px" }}>Great apps to journal in</p>
              <div style={styles.notepadApps}>
                {["Apple Notes", "Notion", "Obsidian", "Day One", "Google Docs", "Pen & Paper"].map(app => (
                  <span key={app} style={styles.notepadApp}>{app}</span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "40px" }}>
            {selectedDay.day > 1 && (
              <button style={styles.ghostBtn} onClick={() => openDay(CHALLENGE_DAYS[selectedDay.day - 2])}>← Day {selectedDay.day - 1}</button>
            )}
            <div />
            {selectedDay.day < 30 && (
              <button style={styles.ghostBtn} onClick={() => openDay(CHALLENGE_DAYS[selectedDay.day])}>Day {selectedDay.day + 1} →</button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Home Screen
  return (
    <div style={styles.app}>
      <nav style={styles.nav}>
        <span style={styles.navLogo}>Humility Journey</span>
        <div style={styles.navLinks}>
          {quizScore !== null && <button style={styles.navBtn} onClick={() => setScreen("results")}>My Results</button>}
          <button style={styles.navBtn} onClick={() => setScreen("challenge")}>30-Day Challenge</button>
        </div>
      </nav>

      <div style={styles.hero}>
        <p style={styles.eyebrow}>A Personal Growth Companion</p>
        <h1 style={styles.heroTitle}>The Humility<br />Journey</h1>
        <p style={styles.heroSub}>
          Measure where you are. Then build the kind of person people remember — not for what they owned, but for how they made others feel.
        </p>
        <div style={styles.quote}>
          "Humility and kindness will bring you more respect than a Ferrari ever will."<br />
          <span style={{ fontSize: "13px", color: "#5a5048" }}>— Morgan Housel, The Psychology of Money</span>
        </div>
      </div>

      <div style={{ ...styles.container, paddingTop: 0 }}>
        <div style={styles.cardRow}>
          <div
            style={styles.card}
            onClick={() => setScreen("quiz")}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#c4a96b"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#2d2b28"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <div style={styles.cardIcon}>🪞</div>
            <div style={styles.cardTitle}>Humility Assessment</div>
            <div style={styles.cardDesc}>15 questions across 9 dimensions. Understand your baseline before you grow.</div>
            {quizScore !== null && <div style={{ marginTop: "16px", fontSize: "13px", color: "#c4a96b" }}>Your score: {quizScore}/75 →</div>}
          </div>

          <div
            style={styles.card}
            onClick={() => setScreen("challenge")}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#c4a96b"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#2d2b28"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <div style={styles.cardIcon}>📓</div>
            <div style={styles.cardTitle}>30-Day Challenge</div>
            <div style={styles.cardDesc}>Daily prompts and micro-practices — journal your reflections in your own notepad.</div>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "64px", paddingTop: "48px", borderTop: "1px solid #1e1c18" }}>
          <p style={{ fontSize: "12px", color: "#3d3830", letterSpacing: "0.1em" }}>Free & open source. No accounts, no tracking, no data collected.</p>
        </div>
      </div>
    </div>
  );
}
