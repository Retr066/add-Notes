import { useState } from 'react';
const useHidden = (initialState = false) => {
  const [hidden, setHidden] = useState(initialState);

  const toogle = () => {
    setHidden(!hidden);
  };
  const toggledFalse = () => {
    setHidden(false);
  };
  const toggledTrue = () => {
    setHidden(true);
  };
  return {
    toogle,
    toggledFalse,
    toggledTrue,
    hidden,
  };
};

export default useHidden;
