import { useEffect } from 'react';

export const useLength = (myArray, myRef) => {
  useEffect(() => {
    if(myArray.length === 1) {
      myRef.current.classList.remove("container-col-2-3");
      myRef.current.classList.add("container-col-1");
    } else if(myArray.length > 1 && myArray.length <= 3) {
      myRef.current.classList.remove("container-col-1");
      myRef.current.classList.add("container-col-2-3");
    } else if(myArray.length > 3) {
      myRef.current.classList.remove("container-col-1");
      myRef.current.classList.remove("container-col-2-3");
    }
  }, [myArray, myRef]);
};