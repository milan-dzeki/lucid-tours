import { useState } from 'react';

export const useQuestionModal = () => {
  const [questionModalData, setQuestionModalData] = useState({
    show: false,
    title: "",
    text: ""
  });

  const showQuestionModal = (title, text) => {
    setQuestionModalData({
      show: true,
      title,
      text
    })
  };
  
  const closeQuestionModal = () => {
    setQuestionModalData({
      show: false,
      title: "",
      text: ""
    })
  };

  return {
    questionModalData,
    showQuestionModal,
    closeQuestionModal
  }
};