import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import useHidden from '../hooks/useHidden';
import styled from 'styled-components';
import Alert from './Alert';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 1em 0;
`;
const ContainerForm = styled.div`
  display: flex;
  width: 50%;
  @media (max-width: 425px) {
    width: 90%;
  }
  @media (max-width: 768px) {
    width: 80%;
  }
`;
const Input = styled.input`
  outline: none;
  font-size: 1.5em;
  border-radius: 3px;
  font-style: italic;
  width: 100%;
  color: palevioletred;
  text-decoration: none;
`;
const Button = styled.button`
  color: palevioletred;
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  text-decoration: none;
  border-radius: 3px;
  cursor: pointer;
`;
const colors = ['green', 'red', 'yellow', 'blue', 'white'];
function Submit() {
  const alertHidden = useHidden(true);
  const { hidden, toggledFalse, toggledTrue } = alertHidden;
  const { addToNote, save, state } = useContext(AppContext);
  const { notes } = state;
  const [note, setNote] = useState('');
  const [indice, setIndice] = useState(0);
  const [message, setMessage] = useState('');
  const handleColor = () => {
    let numMax = colors.length;
    let color;
    if (indice === numMax) {
      setIndice(0);
      color = colors[indice];
    } else {
      color = colors[indice];
      setIndice(indice + 1);
    }
    return color;
  };

  const handleAddNote = () => {
    if (!note || note.length < 3) {
      setMessage(
        'The field note is required and should not be less than 3 characters '
      );
      toggledFalse();
      setTimeout(() => {
        toggledTrue();
      }, 3000);
    } else {
      toggledTrue();
      const newNota = {
        id: Date.now(),
        note: note,
        color: handleColor(),
        completed: false,
      };
      addToNote(newNota);
      setNote('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddNote();
    }
  };

  useEffect(() => {
    save(notes);
  }, [state, notes, save]);

  const handleCompleted = (e) => {
    setNote(e.target.value);
  };
  return (
    <Container>
      <ContainerForm>
        <Input
          autoFocus={true}
          onKeyPress={handleKeyPress}
          onChange={handleCompleted}
          type="text"
          value={note}
          placeholder="Insert a new notes"
        ></Input>
        <Button onClick={handleAddNote}>Add</Button>
      </ContainerForm>
      <Alert handleHidden={hidden} message={message}></Alert>
    </Container>
  );
}

export default Submit;
