"use client";
import React, { useState } from "react";
import questionData from "./questionData"; // The path might differ based on your file structure
import QuestionModal from "./QuestionModal"; // This is the modal component that you will create
import Navbar from "@/components/Navbar";
const Jeopardy = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openQuestionModal = (question) => {
    setSelectedQuestion(question);
    setIsModalOpen(true);
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
                key={question.value}
                style={styles.questionCell}
                onClick={() => openQuestionModal(question)}
                disabled={question.answered} // You can control the state to mark as answered
              >
                ${question.value}
              </button>
            ))}
          </div>
        ))}

        {isModalOpen && (
          <QuestionModal
            question={selectedQuestion}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </>
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
};

export default Jeopardy;
