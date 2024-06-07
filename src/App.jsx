import { useState } from "react";

const App = () => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const [chatHistory, setChatHistory] = useState([]);

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
            setError("Error: Please ask a question");
            return;
        }
        try {
            const options = {
                method: "POST",
                body: JSON.stringify({
                    history: chatHistory,
                    message: value,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const response = await fetch(
                "http://localhost:8000/gemini",
                options
            );

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
                ...oldChatHistory,
                {
                    role: "user",
                    parts: value,
                },
                {
                    role: "model",
                    parts: data.parts.join(" "), // Join parts to form a complete message
                },
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
                    onChange={(e) => setValue(e.target.value)}
                />
                {!error && <button onClick={getResponse}>Ask Me</button>}
                {error && <button onClick={clear}>Clear</button>}
            </div>
            {error && <p>{error}</p>}
            <div className="search-result">
                {chatHistory.map((chatItem, index) => (
                    <div key={index}>
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
