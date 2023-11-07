// QuestionModal.js
"use client";
import React, { useState } from "react";
export const QuestionModal = ({ question, onClose, onAnswerReveal }) => {
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  const handleRevealAnswer = () => {
    setIsAnswerRevealed(true);
    onAnswerReveal(question.id); // Pass the question's unique ID here
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

// At the bottom of Jeopardy.js or inside your CSS file
const styles = {
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

export default QuestionModal;
