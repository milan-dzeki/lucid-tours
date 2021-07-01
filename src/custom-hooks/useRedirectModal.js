import { useState } from 'react';

export const useRedirectModal = () => {
  const [redirectModalShow, setRedirectModalShow] = useState(false);

  const showRedirectModal = () => {
    setRedirectModalShow(true);
  };
  const hideRedirectModal = () => {
    setRedirectModalShow(false);
  };

  return {
    redirectModalShow,
    showRedirectModal,
    hideRedirectModal
  };
};