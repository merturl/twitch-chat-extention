import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { TwitchMessenger } from '../lib/client';
import storage from '../lib/storage';
import { addChannel, removeChannel, setChannels, selectChannels, updateChannel } from '../modules/channels';
import { selectTwitch } from '../modules/twitch';

export default function useChannel() {
  const { connected } = useSelector(selectTwitch);
  const { init, channels } = useSelector(selectChannels);
  const dispatch = useDispatch();
  const client = TwitchMessenger.getInstance();

  useEffect(() => {
    const previousChannels = storage.getItem('channels') || [];
    dispatch(setChannels(previousChannels));
  }, []);

  useEffect(() => {
    if (!init || !connected) return;
    joinChannels();
  }, [init, connected]);

  const joinChannels = useCallback(async () => {
    const newChannels = [];
    for (const { name } of channels) {
      try {
        await client.join(name);
        newChannels.push({ name, connected: true });
        toast.success(`${name} 채널이 연결 되었습니다.`);
      } catch (error) {
        newChannels.push({ name, connected: false });
        toast.error(`${name} 채널 연결에 실패하였습니다.`);
      }
    }
    dispatch(setChannels(newChannels));
  }, [dispatch, channels]);

  const onAddChannel = useCallback(
    async (name: string) => {
      if (name.length === 0) {
        toast.error('채널 이름을 입력하세요.');
        return;
      }
      if (channels.find((channel) => channel.name === name)) {
        toast.error('이미 등록된 채널입니다.');
        return;
      }

      try {
        await client.join(name);
        dispatch(
          addChannel({
            name,
            connected: true,
          })
        );
        toast.success(`${name} 채널이 연결 되었습니다.`);
      } catch (error) {
        dispatch(
          addChannel({
            name,
            connected: false,
          })
        );
        toast.error(`${name} 채널 연결에 실패하였습니다.`);
      }
    },
    [dispatch, channels]
  );

  const onRemoveChannel = useCallback(
    async (name: string) => {
      try {
        await client.part(name);
      } catch (error) {
        console.log(error);
      }
      dispatch(removeChannel(name));
      toast.success(`${name} 채널이 삭제되었습니다`);
    },
    [dispatch]
  );

  const onUpdateChannel = useCallback(
    async (name: string) => {
      const currentChannels = client.getChannels();
      if (currentChannels.find((channelName) => channelName === `#${name}`))
        return toast.success(`${name} 채널이 이미 연결 되었있습니다`);
      try {
        await client.join(name);
        dispatch(updateChannel({ name, connected: true }));
        toast.success(`${name} 채널이 연결 되었습니다`);
      } catch (error) {
        dispatch(updateChannel({ name, connected: false }));
        toast.error(`${name} 채널 연결에 실패하였습니다.`);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (!init) return;
    storage.setItem('channels', channels);
  }, [channels]);

  return {
    channels,
    onAddChannel,
    onRemoveChannel,
    onUpdateChannel,
  };
}
