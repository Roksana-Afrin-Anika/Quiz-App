// QuizFinished.js
import React from "react";
import "./QuizFinished.css";

const QuizFinished = ({ score, totalQuestions }) => {
  return (
    <div className="container">
      <h1>Quiz Finished!</h1>
      <h2>
        Your Score: {score} / {totalQuestions}
      </h2>
    </div>
  );
};

export default QuizFinished;
