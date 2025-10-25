import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(express.static("frontend"));

app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer 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`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    }),
  });

  const data = await response.json();
  res.json({ reply: data.choices[0].message.content });
});

app.listen(3000, () => console.log("🤖 AI Bot running on port 3000"));
