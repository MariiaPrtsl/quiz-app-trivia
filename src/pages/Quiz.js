import React, { useEffect, useState } from "react";
import AnswerTimer from "../components/AnswerTimer";
import Result from "../pages/Result";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showAnswerTimer, setShowAnswerTimer] = useState(true);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=10&type=multiple"
      );
      const data = await response.json();
      setQuestions(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAnswer = (answer, index) => {
    setSelectedAnswer(answer);
    setSelectedAnswerIndex(index);
  };

  const onClickNext = () => {
    setShowAnswerTimer(false);
    setSelectedAnswerIndex(null);
    if (selectedAnswer === "") {
      return;
    }

    const question = questions[currentQuestion];

    if (selectedAnswer === question.correct_answer) {
      setScore(score + 1);
    }

    setSelectedAnswer("");

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswerIndex(null);
    } else {
      setShowScore(true);
    }

    setTimeout(() => {
      setShowAnswerTimer(true);
    });
  };

  const handleTimeUp = () => {
    setSelectedAnswer(false);
    handleAnswer(false);
  };

  const onTryAgain = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer("");
    setShowAnswerTimer(true);
  };

  const result = {
    score: score,
    correctAnswers: score,
    wrongAnswers: questions.length - score,
  };

  return (
    <div className="quiz-container container">
      {!showScore ? (
        <>
          {showAnswerTimer && (
            <AnswerTimer duration={10} onTimeUp={handleTimeUp} />
          )}

          <h1 className="text-2xl md:text-3xl lg:text-4xl mb-4">
            Question {currentQuestion + 1}/{questions.length}
          </h1>
          <div className="mb-8">
            <h2 className="text-lg md:text-xl lg:text-2xl mb-4">
              {questions[currentQuestion]?.question}
            </h2>

            {questions[currentQuestion]?.incorrect_answers.map(
              (answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(answer, index)}
                  className={`bg-gray-300 text-black w-full rounded px-4 py-2 mr-2 mb-2 hover:bg-blue-600 ${
                    selectedAnswerIndex === index ? "bg-blue-600" : null
                  } 
                  }`}
                >
                  {answer}
                </button>
              )
            )}

            <button
              onClick={() =>
                handleAnswer(questions[currentQuestion]?.correct_answer)
              }
              className={`bg-gray-300 text-black rounded w-full px-4 py-2 mr-2 mb-2 hover:bg-blue-600${
                selectedAnswerIndex ===
                questions[currentQuestion]?.correct_answer
                  ? "bg-blue-600"
                  : ""
              }`}
            >
              {questions[currentQuestion]?.correct_answer}
            </button>

            <div className="flex justify-between">
              <button
                className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
                onClick={() => setShowScore(true)}
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Quit
                </span>
              </button>
              <button
                className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
                onClick={onClickNext}
                disabled={selectedAnswerIndex === null}
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Next
                </span>
              </button>
            </div>
          </div>
        </>
      ) : (
        <Result
          result={result}
          onTryAgain={onTryAgain}
          totalQuestions={questions.length}
        />
      )}
    </div>
  );
};

export default Quiz;

