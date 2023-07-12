import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);

const Result = ({ totalQuestions, result, onTryAgain }) => {
  const { score, correctAnswers, wrongAnswers } = result;
  const correctPercentage = ((correctAnswers / totalQuestions) * 100).toFixed(
    2
  );
  const wrongPercentage = ((wrongAnswers / totalQuestions) * 100).toFixed(2);

  const chartData = {
    labels: ["Correct Answers", "Wrong Answers"],
    datasets: [
      {
        data: [correctPercentage, wrongPercentage],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  return (
    <div className="flex flex-col items-center">
      <h3>Results</h3>
      <p>Total Questions: {totalQuestions}</p>
      <p>Total Score: {score}</p>
      <p>Correct Questions: {correctAnswers}</p>
      <p>Wrong Answers: {wrongAnswers}</p>

      <div className="max-w-[400px] my-5 mx-0 ">
        <Pie data={chartData} />
      </div>

      <button
        onClick={onTryAgain}
        className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Try Again
      </button>
    </div>
  );
};

export default Result;
