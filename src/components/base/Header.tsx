import React from 'react';
import styled from 'styled-components';

const Block = styled.header`
  color: white;
  background-color: #24292e;
  font-size: 2rem;
  box-shadow: 0px 1px 5px rgb(0 0 0 / 25%);
  margin-bottom: 5px;
`;

interface HeaderProps {
  value: string;
}

function Header({ value }: HeaderProps) {
  return <Block>{value}</Block>;
}

export default React.memo(Header);
