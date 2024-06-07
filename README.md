# React-Google-GenerativeAI-Chat

This project is a chat application that integrates with Google's Generative AI model for intelligent responses. Users can ask questions, receive responses, and view their chat history. The project demonstrates how to use React for the frontend and Express.js for the backend, leveraging Google's Generative AI for conversational capabilities.

## Getting Started

To get started with this project, follow the steps below:

### Prerequisites

-   Node.js installed on your machine
-   Google Generative AI API key

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/react-google-generativeai-chat.git
    cd react-google-generativeai-chat
    ```

2. Install dependencies for both the server and client:

    ```sh
    # Install server dependencies
    cd server
    npm install

    # Install client dependencies
    cd ../client
    npm install
    ```

3. Create a `.env` file in the `server` folder and add your Google Generative AI API key:

    ```env
    API_KEY=your-google-generative-ai-api-key
    ```

## Running the Application

### Frontend

To run the frontend React app, navigate to the `client` folder and run:

```sh
npm run dev
```

The frontend development server will start, and you can access the app at [http://localhost:3000](http://localhost:3000).

### Backend

To run the backend server using Express.js, navigate to the `server` folder and run:

```sh
npm start
```

The backend server will start, and you can access it at [http://localhost:8000](http://localhost:8000).

## Frontend-Backend Integration

The frontend communicates with the backend server to get responses from the Generative AI model. When a user asks a question, the frontend sends a POST request to the backend with the chat history and the user's question. The backend then processes the request using the Generative AI model and returns the response, which is displayed in the chat history.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
