import React, { useCallback } from 'react';
import styled from 'styled-components';
import Form from '../base/Form';
import useUser from '../../hooks/useUser';
import useInput from '../../hooks/useInput';
import User from './User';
import Header from '../base/Header';

const Block = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Wrap = styled.div`
  flex: 1;
  display: flex;
  overflow: auto;
  padding: 0.25rem;
  div {
    flex: 1;
  }
`;

function UserList() {
  const [user, onChange, onReset] = useInput('');
  const { users, onAddUser, onRemoveUser } = useUser();

  const handleClick = useCallback(() => {
    onAddUser(user.toLowerCase());
    onReset();
  }, [user, onAddUser]);

  const handleRemove = useCallback(
    (user: string) => {
      onRemoveUser(user);
    },
    [onRemoveUser]
  );

  return (
    <Block>
      <Header value={'Chatter'} />
      <Wrap>
        <div>
          {users.map((user, i) => (
            <User key={i} value={user} onRemove={handleRemove} />
          ))}
        </div>
      </Wrap>
      <Form name={'add'} value={user} onClick={handleClick} onChange={onChange} />
    </Block>
  );
}

export default React.memo(UserList);
