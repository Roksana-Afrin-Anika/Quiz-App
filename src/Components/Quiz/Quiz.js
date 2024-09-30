import React from "react";
import "./Quiz.css";
import { useEffect, useState } from "react";
import CategorySelector from "../Category_Selector/CategorySelector";
import QuestionDisplay from "../QuestionDisplay/QuestionDisplay";
import QuizFinished from "../QuizFinished/QuizFinished";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [quizFinished, setQuizFinished] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.trivia_categories);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const fetchQuestions = (category) => {
    const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=easy&type=multiple`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.results);
      })
      .catch((error) => console.error("Error fetching quiz questions:", error));
  };

  const handleCategorySelection = (categoryId) => {
    setSelectedCategory(categoryId);
    fetchQuestions(categoryId);
  };

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
    setCorrectAnswer(questions[currentQuestionIndex]?.correct_answer);
    setIsAnswerSelected(true);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestionIndex]?.correct_answer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer("");
      setCorrectAnswer("");
      setIsAnswerSelected(false);
    } else {
      setQuizFinished(true);
    }
  };

  if (quizFinished) {
    return <QuizFinished score={score} totalQuestions={questions.length} />;
  }

  return (
    <div className="container">
      {questions.length === 0 ? (
        <CategorySelector
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategorySelection}
        />
      ) : (
        <QuestionDisplay
          question={questions[currentQuestionIndex]}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          selectedAnswer={selectedAnswer}
          correctAnswer={correctAnswer}
          isAnswerSelected={isAnswerSelected}
          onAnswerSelect={handleAnswerSelection}
          onNextQuestion={handleNextQuestion}
        />
      )}
    </div>
  );
};

export default Quiz;
