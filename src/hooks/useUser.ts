import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import storage from '../lib/storage';
import { addUser, removeUser, setUsers, selectUsers } from '../modules/users';

export default function useUser() {
  const { init, users } = useSelector(selectUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    const previousUsers = storage.getItem('users') || [];
    dispatch(setUsers(previousUsers));
  }, []);

  const onAddUser = useCallback(
    (user: string) => {
      if (user.length === 0) {
        toast.error('유저 이름을 입력하세요.');
        return;
      }
      if (users.includes(user)) {
        toast.error('이미 등록된 유저입니다.');
        return;
      }
      dispatch(addUser(user));
      toast.success(`${user}가 등록되었습니다.`);
    },
    [dispatch, users]
  );

  const onRemoveUser = useCallback(
    (user: string) => {
      if (!users.includes(user)) {
        toast.error('등록 되지 않은 유저입니다.');
        return;
      }
      dispatch(removeUser(user));
      toast.success(`${user}가 삭제되었습니다.`);
    },
    [dispatch, users]
  );

  useEffect(() => {
    if (!init) return;
    storage.setItem('users', users);
  }, [users]);

  return {
    users,
    onAddUser,
    onRemoveUser,
  };
}
