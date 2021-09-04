import { useCallback, useState } from 'react';

export default function useInput(defaultValue: string) {
  const [input, setInput] = useState(defaultValue);
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    setInput(e.target.value);
  }, []);
  const onReset = useCallback(() => setInput(''), []);
  return [input, onChange, onReset] as [string, typeof onChange, typeof onReset];
}
