import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import * as middlewares from "./middlewares";
import { GoogleGenerativeAI } from "@google/generative-ai";

require("dotenv").config();

const API_KEY = process.env.API_KEY || "";

const genAI = new GoogleGenerativeAI(API_KEY);

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<any>("/", (req, res) => {
    res.send("<p>Generative AI</p>");
});

app.post("/gemini", async (req, res) => {
    try {
        // Ensure chat history items have a 'parts' property that is an array of objects with 'text'
        const history = req.body.history.map((item: any, index: number) => {
            if (!item.parts) {
                throw new Error("History items should have 'parts' property");
            }

            const parts = Array.isArray(item.parts) ? item.parts : [item.parts];
            return {
                role: index === 0 ? "user" : "model", // Assuming the first message is from the user
                parts: parts.map((part: any) => ({ text: part })),
            };
        });

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const chat = model.startChat({ history });
        const message = req.body.message;
        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = await response.text();

        // Send the response as a JSON object with the 'parts' property
        res.json({ parts: [text] });
    } catch (error: any) {
        console.error("Server error:", error);
        res.status(500).json({ error: error.message });
    }
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
