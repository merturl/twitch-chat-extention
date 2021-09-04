import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TwitchMessenger } from '../lib/client';
import { CommonUserstate } from 'tmi.js';
import { selectTwitch } from '../modules/twitch';
import { selectUsers } from '../modules/users';

interface Message {
  channel: string;
  userstate: CommonUserstate;
  message: any;
}

export default function useMessage() {
  const { connected } = useSelector(selectTwitch);
  const { users } = useSelector(selectUsers);
  const [messages, setMessages] = useState<Message[]>([]);
  const client = TwitchMessenger.getInstance();

  const onAddMessage = useCallback(
    (channel: string, userstate: CommonUserstate, message: string, self: boolean) => {
      if (self) {
        return;
      }
      const name = userstate['username'];
      if (!users.includes(name)) return;
      setMessages((oldMessage) => [
        ...oldMessage.slice(-300),
        {
          channel,
          userstate,
          message,
        },
      ]);
    },
    [users]
  );

  useEffect(() => {
    if (!connected) return;
    client.addListener('message', onAddMessage);
    return () => {
      client.removeListener('message', onAddMessage);
    };
  }, [connected, onAddMessage]);

  return {
    messages,
  };
}
