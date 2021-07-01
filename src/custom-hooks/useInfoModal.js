import { useState } from 'react';

export const useInfoModal = () => {
  // info modal data
  const [infoModalData, setInfoModalData] = useState({show: false, bcgImg: "", title: "", text: ""});

  const showInfoModal = (bcgImg, title, text) => {
    setInfoModalData({show: true, bcgImg: bcgImg, title: title, text: text});
  };

  const closeInfoModal = () => {
    setInfoModalData({show: false, bcgImg: "", title: "", text: ""});
  };

  return {
    infoModalData,
    showInfoModal,
    closeInfoModal
  };
};