import React from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';

interface UserProps {
  value: string;
  onRemove: (value: string) => any;
}

const Block = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 0.5rem;
  border-radius: 1rem;
  margin: 0.5rem;
  box-shadow: 0px 1px 5px rgb(0 0 0 / 25%);
  transition: 0.25s box-shadow ease-in, 0.25s transform ease-in;
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 20px 0 rgba(0, 0, 0, 0.08);
  }
`;

const Profile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  h2 {
    margin-left: 0.8rem;
  }
`;

const StyledButton = styled.button`
  background: transparent;
  border: none;
  padding: 0.5rem;
  font-size: 1.5rem;
  &:hover {
    background: rgba(36, 41, 46, 0.1);
    color: white;
  }
`;

function User({ value, onRemove }: UserProps) {
  return (
    <Block>
      <Profile>
        <FaUserCircle size="32" />
        <h2>{value}</h2>
      </Profile>
      <StyledButton
        onClick={() => {
          onRemove(value);
        }}
      >
        <FaTimes />
      </StyledButton>
    </Block>
  );
}
export default React.memo(User);
