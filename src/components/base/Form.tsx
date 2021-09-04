import React from 'react';
import { useCallback } from 'react';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';

interface FormProps {
  name: any;
  value: any;
  onChange: any;
  onClick: any;
}

const Block = styled.div`
  display: flex;
  margin: 0.5rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem;
  margin-right: 0.5rem;
`;

const Button = styled.button`
  width: 50px;
  background: #24292e;
  color: white;
`;

function Form({ name, value, onChange, onClick }: FormProps) {
  const onKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key == 'Enter') {
        onClick();
      }
    },
    [onClick]
  );
  return (
    <Block>
      <Input type="text" value={value} onChange={onChange} onKeyPress={onKeyPress} />
      <Button onClick={onClick}>
        <FaPlus />
      </Button>
    </Block>
  );
}

export default React.memo(Form);
