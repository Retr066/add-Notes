import { useState, useCallback } from 'react';
import initialState from '../initialState';

const useInitialState = () => {
  const [state, setState] = useState(initialState);

  const addToNote = (note) => {
    setState({
      ...state,
      notes: [...state.notes, note],
    });
  };
  const removeFromNotes = (idNote) => {
    setState({
      ...state,
      notes: state.notes.filter((item) => item.id !== idNote),
    });
  };
  const save = useCallback((notas) => {
    localStorage.setItem('Notes', JSON.stringify(notas));
  }, []);
  const updatedNote = (nota) => {
    setState({
      ...state,
      notes: state.notes.map((t) => (t.id === nota.id ? nota : t)),
    });
  };
  return {
    addToNote,
    removeFromNotes,
    updatedNote,
    state,
    save,
  };
};

export default useInitialState;
