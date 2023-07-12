import React from "react";

const Home = ({ startQuiz }) => {
  const handleStartQuiz = () => {
    startQuiz();
  };
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mt-20">
        <h1 className="text-4xl font-bold">Welcome to the Quiz App!</h1>
        <p className="text-lg mt-4">
          Press the button below to start the quiz.
        </p>
        <button
          className=" bg-slate-600 text-white rounded px-4 py-2 mt-8 hover:bg-slate-500"
          onClick={handleStartQuiz}
        >
          I'm lucky!
        </button>
      </div>
    </div>
  );
};

export default Home;
