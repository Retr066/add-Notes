import React, { useContext } from 'react';
import styled from 'styled-components';
import Note from './Note';
import { AppContext } from '../context/AppContext';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Notes = () => {
  const { state } = useContext(AppContext);
  const { notes } = state;

  return (
    <Container>
      {notes.map((note) => (
        <Note key={note.id} note={note}></Note>
      ))}
    </Container>
  );
};

export default Notes;
