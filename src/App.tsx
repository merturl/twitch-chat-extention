import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import styled from 'styled-components';
import { ToastContainer, Flip } from 'react-toastify';
import GlobalStyle from './styles/globalStyles';
import UserList from './components/user/UserList';
import ChannelList from './components/channel/ChannelList';
import ChatList from './components/chat/ChatList';
import useClient from './hooks/useClient';

const Block = styled.div`
  display: flex;
  flex: 1;
`;

function App() {
  useClient();

  return (
    <>
      <GlobalStyle />
      <ChannelList />
      <ChatList />
      <UserList />
      <ToastContainer transition={Flip} position="top-right" autoClose={1000} closeOnClick pauseOnHover={true} />
    </>
  );
}

export default App;
