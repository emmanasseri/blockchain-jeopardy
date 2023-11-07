"use client";
import React, { useState } from "react";
import questionData from "./questionData"; // The path might differ based on your file structure
//import QuestionModal from "./QuestionModal"; // This is the modal component that you will create
import Navbar from "@/components/Navbar";

questionData.forEach((category, i) => {
  category.questions.forEach((question, j) => {
    // Ensure there is not already an ID assigned
    if (!question.id) {
      question.id = `q-${i}-${j}`; // Construct a unique ID for each question
    }
  });
});

export const Jeopardy = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set()); // Set to track answered questions
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openQuestionModal = (question) => {
    setSelectedQuestion(question);
    setIsModalOpen(true);
  };

  const handleAnswerReveal = (questionId) => {
    setAnsweredQuestions((prev) => new Set(prev).add(questionId));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuestion(null); // Reset selected question when closing modal
  };

  return (
    <>
      <Navbar />
      <div style={styles.jeopardyBoard}>
        {questionData.map((category, index) => (
          <div key={index} style={styles.categoryColumn}>
            <div style={styles.categoryTitle}>{category.category}</div>

            {category.questions.map((question) => (
              <button
                key={question.id} // Use unique ID for key
                style={styles.questionCell}
                onClick={() => openQuestionModal(question)}
                disabled={answeredQuestions.has(question.id)} // Check if the unique ID is in the Set
              >
                ${question.value}
              </button>
            ))}
          </div>
        ))}

        {isModalOpen && selectedQuestion && (
          <QuestionModal
            question={selectedQuestion}
            onClose={closeModal}
            onAnswerReveal={handleAnswerReveal}
          />
        )}
      </div>
    </>
  );
};
export const QuestionModal = ({ question, onClose, onAnswerReveal }) => {
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  const handleRevealAnswer = () => {
    setIsAnswerRevealed(true);
    onAnswerReveal(question.id); // Pass the unique question ID here
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <button style={styles.closeButton} onClick={onClose}>
          X
        </button>
        <div className="question-text">{question.question}</div>
        {isAnswerRevealed && (
          <div className="answer-text">{question.answer}</div>
        )}
        {!isAnswerRevealed && (
          <button className="reveal-answer-button" onClick={handleRevealAnswer}>
            Reveal Answer
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
  jeopardyBoard: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Takes the full height of the viewport
  },
  categoryColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 10px", // Gives a little space between the columns
  },
  categoryTitle: {
    marginBottom: "20px", // Space between title and questions
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  questionCell: {
    width: "100%", // Makes all buttons the same width
    marginBottom: "10px", // Space between buttons
    padding: "10px 0", // Some padding for aesthetics
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000, // ensure it's above other items
  },
  modalContent: {
    width: "50%", // or any desired width
    backgroundColor: "#FFF",
    padding: "20px",
    borderRadius: "10px",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    border: "none",
    background: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
  },
  questionText: {
    marginBottom: "20px",
    color: "black",
  },
  answerText: {
    marginTop: "20px",
    fontWeight: "bold",
    color: "black",
  },
  revealAnswerButton: {
    display: "block",
    width: "100%",
    padding: "10px 20px",
    margin: "10px 0",
    backgroundColor: "#007bff",
    color: "black",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Jeopardy;