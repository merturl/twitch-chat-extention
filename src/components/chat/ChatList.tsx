import React from 'react';
import styled from 'styled-components';
import { CommonUserstate } from 'tmi.js';
import ScrollToBottom, { useScrollToBottom, useSticky } from 'react-scroll-to-bottom';
import useMessage from '../../hooks/useMessage';
import { getTimeStamp } from '../../lib/utlis';
import Chat from './Chat';
import Header from '../base/Header';

const Block = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 1px 5px rgb(0 0 0 / 25%);
`;

const ChatBlock = styled.div`
  flex: 1;
  display: flex;
  overflow: auto;
  .container {
    position: relative;
  }
  border-bottom: 0.2rem solid rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

interface ChatListProps {}

function ChatList() {
  const { messages } = useMessage();
  const scrollToBottom = useScrollToBottom();
  const [sticky] = useSticky();

  const getMessageElement = (message: string, { emotes }: CommonUserstate) => {
    if (!emotes) return message;
    const messageMap = new Map();
    Object.entries(emotes).forEach(([id, positions]: any) => {
      // use only the first position to find out the emote key word
      const position = positions[0];
      const [start, end] = position.split('-');
      const stringToReplace = message.substring(parseInt(start, 10), parseInt(end, 10) + 1);
      const src = `https://static-cdn.jtvnw.net/emoticons/v2/${id}/default/dark/1.0`;
      messageMap.set(stringToReplace, src);
    });
    return message
      .split(' ')
      .map((message, index) =>
        messageMap.get(message) ? <img key={index} src={messageMap.get(message)} /> : <span key={index}>{message}</span>
      );
  };

  return (
    <Block>
      <Header value={'Chat'} />
      <ChatBlock>
        <ScrollToBottom>
          {messages.map((message, i) => {
            return (
              <Chat
                key={i}
                timestamp={getTimeStamp(message.userstate['tmi-sent-ts'])}
                channel={message.channel}
                name={`${message.userstate['display-name']} (${message.userstate.username})`}
                message={getMessageElement(message.message, message.userstate)}
                color={message.userstate['color'] || '#1E90FF'}
              />
            );
          })}
          {!sticky && <button onClick={scrollToBottom}>Click me to scroll to bottom</button>}
        </ScrollToBottom>
      </ChatBlock>
    </Block>
  );
}

export default React.memo(ChatList);
