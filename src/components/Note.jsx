import { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context/AppContext';
import useHidden from '../hooks/useHidden';
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.inputColor || 'pink'};
  width: 40%;
  margin: 1em 0;
  padding: 1em 10px;
  border-radius: 15px;
  word-break: break-word;
  @media (max-width: 400px) {
    width: 90%;
  }
`;
const Title = styled.div`
  font-size: 1em;
  font-family: monospace;
  text-align: center;
  transition: all 0.5s ease;
  outline: none;
  color: #000000a6;
  &.something {
    text-decoration: line-through;
    opacity: 0.7;
  }
`;

const ContainerOptions = styled.div`
  display: flex;
  align-items: center;
`;
const Option = styled.input`
  margin: 0 0.5em 0 2em;
`;
const Span = styled.span`
  color: black;
  cursor: pointer;
  margin: 0 0.5em 0 0.5em;
`;

const Note = ({ note }) => {
  const { removeFromNotes, state, updatedNote, save } = useContext(AppContext);
  const { notes } = state;
  const hiddenSpan = useHidden(true);
  const hiddenOption = useHidden(false);
  const hiddenTrash = useHidden();
  const inputEl = useRef(null);

  const handleRemove = (productIndex) => () => {
    removeFromNotes(productIndex);
  };
  useEffect(() => {
    save(notes);
  }, [save, notes]);

  const handleInputChange = (e, id) => {
    const target = e.target.checked;
    const nota = notes.find((item) => item.id === id);
    const newNota = {
      id: nota.id,
      note: nota.note,
      color: nota.color,
      completed: target,
    };
    hiddenTrash.toogle();
    updatedNote(newNota);
  };
  const handleEditNote = () => {
    const div = inputEl.current;
    div.setAttribute('contentEditable', true);
    hiddenSpan.toggledFalse();
    hiddenOption.toggledTrue();
  };
  const handleEdit = (id) => {
    hiddenOption.toogle();
    hiddenSpan.toogle();
    const title = inputEl.current.textContent;
    const nota = notes.find((item) => item.id === id);
    const newNota = {
      id: nota.id,
      note: title,
      color: nota.color,
      completed: nota.completed,
    };
    updatedNote(newNota);
  };

  return (
    <Container inputColor={note.color}>
      <Title
        className={`${note.completed ? 'something' : ''}`}
        onClick={handleEditNote}
        spellCheck={false}
        ref={inputEl}
      >
        {note.note}
      </Title>
      <ContainerOptions>
        <Option
          hidden={hiddenOption.hidden}
          defaultChecked={note.completed}
          type="checkbox"
          onChange={(e) => handleInputChange(e, note.id)}
        ></Option>
        <Span hidden={hiddenSpan.hidden}>
          <i className="fas fa-save" onClick={() => handleEdit(note.id)}></i>
        </Span>
        <Span hidden={hiddenTrash.hidden}>
          <i onClick={handleRemove(note.id)} className="fas fa-trash"></i>
        </Span>
      </ContainerOptions>
    </Container>
  );
};

export default Note;
