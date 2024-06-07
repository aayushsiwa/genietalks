require("dotenv").config();

const PORT = 8000;

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Root route to display text at '/'
app.get("/", (req, res) => {
    res.json("Welcome to the Google Generative AI Chat API!");
});

app.post("/gemini", async (req, res) => {
    try {
        // Ensure chat history items have a 'parts' property that is an array of objects with 'text'
        const history = req.body.history.map((item) => {
            if (!item.parts) {
                throw new Error("History items should have 'parts' property");
            }

            const parts = Array.isArray(item.parts) ? item.parts : [item.parts];
            return { ...item, parts: parts.map((part) => ({ text: part })) };
        });

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const chat = model.startChat({ history });
        const message = req.body.message;
        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = await response.text();

        // Send the response as a JSON object with the 'parts' property
        res.json({ parts: [text] });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
