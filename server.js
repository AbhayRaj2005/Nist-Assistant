const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const Groq = require("groq-sdk");

const app = express();

app.use(cors());
app.use(bodyParser.json());

/* Groq API */
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

/* Home Route */
app.get("/", (req, res) => {
    res.send("NIST Assistant Running...");
});

/* Dialogflow Webhook */
app.post("/webhook", async (req, res) => {

    try {

        const userMessage =
        req.body.queryResult.queryText;

        console.log("User:", userMessage);

        /* AI Response */
        const chatCompletion =
        await groq.chat.completions.create({

            messages: [
                {
                    role: "system",
                    content: `You are NIST University AI Assistant for NIST University Berhampur Odisha India.

Rules:
- Answer ONLY questions related to:
  • NIST University
  • Education
  • Technology
  • Engineering
  • AI
  • Programming
  • Career
  • Student life

- If user asks unrelated questions like:
  • celebrities
  • cricket
  • movies
  • politics
  • Virat Kohli
  • Rohit Sharma

then reply exactly:
"Sorry, I only answer questions related to NIST University, education, and technology."

- If user says NIST, always mean NIST University Berhampur.
- Never talk about National Institute of Standards and Technology.
- Keep answers short and clear.
- Understand every question separately.
- Do not repeat previous answers.`
                },
                {
                    role: "user",
                    content: userMessage
                }
            ],

            model: "llama-3.3-70b-versatile"

        });

        const aiResponse =
        chatCompletion.choices[0]
        .message.content;

        console.log("AI:", aiResponse);

        /* Send back to Dialogflow */
        res.json({
            fulfillmentText: aiResponse
        });

    } catch (error) {

        console.log(error);

        res.json({
            fulfillmentText:
            "Sorry, AI server error."
        });

    }

});

/* Start Server */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
