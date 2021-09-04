import React, { useCallback } from 'react';
import styled from 'styled-components';
import useChannel from '../../hooks/useChannel';
import useInput from '../../hooks/useInput';
import Form from '../base/Form';
import Header from '../base/Header';
import Channel from './Channel';

const Block = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Wrap = styled.div`
  flex: 1;
  display: flex;
  overflow: auto;
  div {
    flex: 1;
  }
`;

function ChannelList() {
  const [channelName, onChange, onReset] = useInput('');
  const { channels, onAddChannel, onRemoveChannel, onUpdateChannel } = useChannel();

  const handleClick = useCallback(() => {
    onAddChannel(channelName.toLowerCase());
    onReset();
  }, [channelName, onAddChannel]);

  const handleRemove = useCallback(
    (channelName: string) => {
      onRemoveChannel(channelName);
    },
    [onRemoveChannel]
  );

  const handleUpdate = useCallback(
    (channelName: string) => {
      onUpdateChannel(channelName);
    },
    [onUpdateChannel]
  );

  return (
    <Block>
      <Header value={'Channel'} />
      <Wrap>
        <div>
          {channels.map((channel, i) => (
            <Channel
              key={i}
              value={channel.name}
              connected={channel.connected}
              onRemove={handleRemove}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      </Wrap>
      <Form name={'add'} value={channelName} onChange={onChange} onClick={handleClick} />
    </Block>
  );
}

export default React.memo(ChannelList);
