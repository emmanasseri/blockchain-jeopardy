// QuestionModal.js
import React from "react";

const QuestionModal = ({ question, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{question.question}</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default QuestionModal;
