"use client";
import React, { useEffect, useState } from "react";
import {
  questionDataSetOne,
  questionDataSetTwo,
  questionDataSetThree,
} from "./questionData"; // The path might differ based on your file structure
//import QuestionModal from "./QuestionModal"; // This is the modal component that you will create
import Navbar from "@/components/Navbar";

export const Jeopardy = () => {
  const [currentQuestionData, setCurrentQuestionData] =
    useState(questionDataSetOne);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set()); // Set to track answered questions
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    // This will run only once when the component mounts
    const mapQuestionData = (dataSet) => {
      dataSet.forEach((category, i) => {
        category.questions.forEach((question, j) => {
          if (!question.id) {
            // Ensure there is not already an ID assigned
            question.id = `q-${i}-${j}`; // Construct a unique ID for each question
          }
        });
      });
    };

    // Map IDs for both question sets
    mapQuestionData(questionDataSetOne);
    mapQuestionData(questionDataSetTwo);
    mapQuestionData(questionDataSetThree);
  }, []);

  const handleSetChange = (event) => {
    const selectedSet = event.target.value;
    switch (selectedSet) {
      case "setOne":
        setCurrentQuestionData(questionDataSetOne);
        break;
      case "setTwo":
        setCurrentQuestionData(questionDataSetTwo);
      case "setThree":
        setCurrentQuestionData(questionDataSetThree);
        break;
      // add more cases as needed for additional sets
    }
    setAnsweredQuestions(new Set()); // Optionally reset the answered questions
    mapQuestionData(currentQuestionData);
  };

  const mapQuestionData = (dataSet) => {
    dataSet.forEach((category, i) => {
      category.questions.forEach((question, j) => {
        // Ensure there is not already an ID assigned
        if (!question.id) {
          question.id = `q-${i}-${j}`; // Construct a unique ID for each question
        }
      });
    });
  };

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
  // This function will return the appropriate styles for a question cell
  const getQuestionCellStyle = (questionId, answeredQuestions) => {
    if (answeredQuestions.has(questionId)) {
      // Style for answered question cells
      return {
        ...styles.questionCell, // Base styles
        backgroundColor: "#020888", // Same as the board, you can adjust if needed
        color: "#605a00", // Dark yellow color for answered questions
        pointerEvents: "none", // Prevents clicking
        opacity: 0.6, // Visual cue that it's disabled
        textShadow: "0 0 8px rgba(0,0,0,0.5)", // Optional: adds a slight shadow to make the text appear blurred
      };
    }

    // Style for unanswered question cells
    return styles.questionCell;
  };

  return (
    <>
      <select onChange={handleSetChange}>
        <option value="setOne">Question Set One</option>
        <option value="setTwo">Question Set Two</option>
        <option value="setThree">Question Set Three</option>
        {/* Add more <option> elements for additional question sets */}
      </select>
      <div style={styles.jeopardyBoard}>
        {currentQuestionData.map((category, index) => (
          <div key={index} style={styles.categoryColumn}>
            <div style={styles.categoryTitle}>{category.category}</div>

            {category.questions.map((question) => (
              <button
                key={question.id}
                style={getQuestionCellStyle(question.id, answeredQuestions)}
                onClick={() => openQuestionModal(question)}
                disabled={answeredQuestions.has(question.id)}
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
          x
        </button>
        <div style={styles.questionText}>{question.question}</div>
        {isAnswerRevealed && (
          <div style={styles.answerText}>{question.answer}</div>
        )}
        {!isAnswerRevealed && (
          <button
            style={styles.revealAnswerButton}
            onClick={handleRevealAnswer}
          >
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
    backgroundColor: "#020888",
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
    color: "white",
  },
  questionCell: {
    width: "100%", // Makes all buttons the same width
    marginBottom: "10px", // Space between buttons
    padding: "10px 0", // Some padding for aesthetics
    backgroundColor: "#020888", // Match the background color with the board
    color: "#E7B36B", // Set the text color to yellow
    border: "1px solid white", // Add a yellow border
    fontSize: "2rem",
    fontWeight: "bold",
    height: "80px",
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
    justifyContent: "center",
    alignItems: "center",
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
    marginBottom: "40px",
    color: "black",
    marginRight: "20px",
  },
  answerText: {
    marginTop: "20px",
    fontWeight: "bold",
    color: "black",
  },
  revealAnswerButton: {
    padding: "10px 20px",
    margin: "10px 0",
    backgroundColor: "#020888",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
  },
};

export default Jeopardy;
