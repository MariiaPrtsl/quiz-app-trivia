import React, { useState } from "react";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import "./index.css";

function App() {
  const [quizStarted, setQuizStarted] = useState(false);

  const startQuiz = () => {
    setQuizStarted(true);
  };

  return (
    <div>
      {quizStarted ? <Quiz /> : <Home startQuiz={startQuiz} />}
    </div>
  );
  // return (
  //   <div className="bg-gray-100 min-h-screen">
  //   <header className="bg-green-500 text-white py-4 text-center">
  //     <div className="container mx-auto px-4">
  //       <h1 className="text-2xl font-bold">Quiz App</h1>
  //     </div>
  //   </header>
  //   <main>
  //      {quizStarted ? <Quiz questions={questions} /> : <Home startQuiz={startQuiz} />}
  //   </main>
  // </div>
  // );
}

export default App;
