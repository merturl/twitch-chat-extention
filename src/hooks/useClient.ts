import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setServerState } from '../modules/twitch';
import { TwitchMessenger } from '../lib/client';

export default function useClient() {
  const client = TwitchMessenger.getInstance();
  const dispatch = useDispatch();

  useEffect(() => {
    connect();
  }, []);

  const connect = useCallback(async () => {
    try {
      await client.connect();
      dispatch(setServerState(true));
      toast.success('트위처 서버에 연결되었습니다.');
    } catch (error) {
      dispatch(setServerState(false));
      toast.error('트위처 서버 연결에 실패하였습니다.');
    }
  }, []);

  return client;
}
