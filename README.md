# React-Gemini-App

This project is a chat application that integrates with Google's Generative AI (Gemini) model. Users can ask questions, receive responses, and view their chat history. The project demonstrates how to use React for the frontend and Express.js for the backend, leveraging Google's Generative AI for intelligent responses.

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs both the frontend and backend servers concurrently in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view the frontend in your browser.\
The backend server will run on [http://localhost:8000](http://localhost:8000).

### `npm run start:frontend`

Runs the frontend React app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run start:backend`

Runs the backend server using nodemon.\
The server will run on [http://localhost:8000](http://localhost:8000).

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However, we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Setting Up the Backend

The backend server is built using Express.js and integrates with Google's Generative AI model.

### Prerequisites

- Node.js installed on your machine
- Google Generative AI API key

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/react-gemini-app.git
   cd react-gemini-app
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the project root and add your Google Generative AI API key:

   ```env
   API_KEY=your-google-generative-ai-api-key
   ```

4. Start the backend server:

   ```sh
   npm run start:backend
   ```

   The server will run on [http://localhost:8000](http://localhost:8000).

## Frontend-Backend Integration

The frontend (React app) communicates with the backend server to get responses from the Generative AI model. When a user asks a question, the frontend sends a POST request to the backend with the chat history and the user's question. The backend then processes the request using the Generative AI model and returns the response, which is displayed in the chat history.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

By following this README, you should be able to set up and run the React-Gemini-App both locally and in production. Enjoy exploring the integration of React and Google's Generative AI!