import React from 'react';
import styled from 'styled-components';
const Container = styled.div`
  display: flex;
`;
const Message = styled.p`
  font-style: italic;
  color: red;
  transition: all 0.5s ease;
`;

function Alert({ message, handleHidden }) {
  return (
    <Container>
      <Message hidden={handleHidden}>{message}</Message>
    </Container>
  );
}

export default Alert;
