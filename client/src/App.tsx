import React, { useState, ChangeEvent } from "react";

interface ChatItem {
    role: string;
    parts: string;
}

const App: React.FC = () => {
    const API_URL = import.meta.env.VITE_API_URL as string;
    const [value, setValue] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [chatHistory, setChatHistory] = useState<ChatItem[]>([]);

    const surpriseOptions = [
        "Who won the latest Nobel Peace Prize?",
        "Who is the prime minister of India?",
        "How to make tea?",
    ];

    const surprise = () => {
        const randomValue =
            surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
        setValue(randomValue);
    };

    const getResponse = async () => {
        if (!value) {
            setError("Please ask a question");
            return;
        }
        const query=value;
        setValue("");
        try {
            console.log("API_URL:", API_URL); // Log the API URL for debugging
            const options = {
                method: "POST",
                body: JSON.stringify({
                    history: chatHistory,
                    message: query,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const response = await fetch(API_URL, options);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Check if the response includes a 'parts' property
            if (!data.parts) {
                throw new Error(
                    "Content should have 'parts' property with an array of Parts"
                );
            }

            setChatHistory((oldChatHistory) => [
                {
                    role: "model",
                    parts: data.parts.join(" "), // Join parts to form a complete message
                },
                {
                    role: "user",
                    parts: value,
                },
                ...oldChatHistory,
            ]);
            setValue("");
        } catch (error) {
            console.error("Error:", error);
            setError("Something went wrong");
        }
    };

    const clear = () => {
        setValue("");
        setError("");
        setChatHistory([]);
    };

    return (
        <div className="app">
            <p>
                What do you want to know?
                <button
                    className="surprise"
                    onClick={surprise}
                    disabled={chatHistory.length > 0}
                >
                    Surprise Me!
                </button>
            </p>
            <div className="input-container">
                <input
                    type="text"
                    value={value}
                    placeholder="When is Christmas...?"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setValue(e.target.value)
                    }
                />
                {!error && (
                    <button onClick={getResponse} className="send">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-send"
                            viewBox="0 0 16 16"
                        >
                            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                        </svg>
                    </button>
                )}
                {error && (
                    <button onClick={clear}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-arrow-repeat"
                            viewBox="0 0 16 16"
                        >
                            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
                            <path
                                fillRule="evenodd"
                                d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
                            />
                        </svg>
                    </button>
                )}
            </div>
            {error && <p>{error}</p>}
            <div className="search-result">
                {chatHistory.map((chatItem, index) => (
                    <div
                        key={index}
                        className={chatItem.role === "user" ? "user" : "model"}
                    >
                        <p className="answer">
                            {chatItem.role} : {chatItem.parts}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
