// @ts-check
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.post("/api/f-convert", async (req, res) => {
  const { input } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;
  // console.log("🔐 API Key 있음?", !!apiKey); 

  if (!input || typeof input !== "string") {
    return res.status(400).json({ error: "유효한 입력이 필요합니다." });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `다음 문장을 F 유형 성격을 가진 사람처럼 공감 있고 따뜻하게 바꿔줘. 답변은 길지않고 간결하게 말해줘. 예의는 지키되 감정을 전달하는 데 집중해줘. 존댓말은 쓰지 말고, 친한 친구한테 얘기하는 것처럼 자연스럽게 반말로 답변해. 원래 의미는 유지하면서 더 감정적이고 배려 있는 표현으로 바꿔줘.\n\n입력 문장: "${input}"`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    // console.log("🟡 Gemini 응답 전체:", JSON.stringify(data, null, 2));
    const result = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!result) throw new Error("Gemini API 응답 없음");

    res.json({ result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Gemini API 호출 실패" });
  }
});


app.post("/api/f-answer", async (req, res) => {
  const { question } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!question || typeof question !== "string") {
    return res.status(400).json({ error: "유효한 질문이 필요합니다." });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `다음 질문에 대해 F 성향을 가진 사람이 대답하듯, 다정하고 공감 어린 말투로 답변을 작성해줘. 답변은 길지않고 간결하게 말해줘. 존댓말은 쓰지 말고, 친한 친구한테 얘기하는 것처럼 자연스럽게 반말로 답변해. 솔직하고 따뜻하며 감정을 이해하는 어조로.\n\nF의 질문: "${question}"`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!answer) throw new Error("Gemini API 응답 없음");

    res.json({ answer });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Gemini API 호출 실패" });
  }
});

app.listen(port, () => {
  console.log(`🚀 서버가 http://localhost:${port} 에서 실행 중`);
});