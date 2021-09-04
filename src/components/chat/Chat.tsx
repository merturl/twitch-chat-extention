import React from 'react';
import styled from 'styled-components';
import { boxFade } from '../../styles/transitions';

interface StyledProps {
  color: string;
}

const Block = styled.div`
  animation: ${boxFade} 0.1s normal ease-in-out both;
  display: block;
  font-size: 1.25rem;
  img {
    width: 1.5rem;
    height: 1.5rem;
    margin-left: 3px;
    margin-right: 3px;
  }
`;

const TimeStamp = styled.span`
  margin-right: 3px;
`;

const Channel = styled.span`
  margin-right: 3px;
`;

const MsgSeparator = styled.span`
  margin-right: 3px;
`;

const UserName = styled.span`
  color: ${(props: StyledProps) => props.color};
`;

const Message = styled.span`
  word-break: break-word;
`;

const Wrap = styled.div`
  display: inline;
`;

const Wrap2 = styled.div`
  display: inline-block;
`;

interface Message {
  timestamp: string;
  channel: string;
  name: string;
  message: any;
  color: string;
}

function Chat({ timestamp, channel, name, message, color }: Message) {
  return (
    <Block>
      <Wrap>
        <Wrap2>
          <TimeStamp>{timestamp}</TimeStamp>
          <Channel>{channel.replace('#', '')} </Channel>
          <UserName color={color}>{name}</UserName>
        </Wrap2>
        <MsgSeparator>: </MsgSeparator>
        <Message>{message}</Message>
      </Wrap>
    </Block>
  );
}

export default React.memo(Chat);
