import React from "react";
import "./QuestionDisplay.css";

const QuestionDisplay = ({
  question,
  currentQuestionIndex,
  totalQuestions,
  selectedAnswer,
  correctAnswer,
  isAnswerSelected,
  onAnswerSelect,
  onNextQuestion,
}) => {
  const answers = [
    ...question.incorrect_answers,
    question.correct_answer,
  ].sort();

  return (
    <div>
      <h1>Category: {question.category}</h1>
      <h2 className="Ques">
        {currentQuestionIndex + 1}. {question.question}
      </h2>
      <ul>
        {answers.map((answer, index) => {
          const isCorrect = answer === correctAnswer;
          const isSelected = selectedAnswer === answer;

          // Generate option labels (a, b, c, d)
          const optionLabel = String.fromCharCode(97 + index);

          return (
            <li
              key={index}
              onClick={() => !isAnswerSelected && onAnswerSelect(answer)}
              className={`${
                isSelected ? (isCorrect ? "correct" : "incorrect") : ""
              }`}
              style={{
                cursor: isAnswerSelected ? "not-allowed" : "pointer",
                pointerEvents: isAnswerSelected ? "none" : "auto",
              }}
            >
              {optionLabel} {answer}{" "}
              {/* Displaying the label before the answer */}
            </li>
          );
        })}
      </ul>
      <button
        className="next"
        onClick={onNextQuestion}
        disabled={!selectedAnswer}
      >
        Next
      </button>
      <div>
        {currentQuestionIndex + 1} of {totalQuestions} Questions
      </div>
    </div>
  );
};

export default QuestionDisplay;
