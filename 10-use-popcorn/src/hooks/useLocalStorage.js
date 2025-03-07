import { useEffect, useState } from 'react';

export function useLocalStorageState(initialState, keyContent){
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(keyContent);
    return JSON.parse(storedValue) || initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(keyContent, JSON.stringify(value));
    },
    [value, keyContent]
  );
  return [value, setValue];
}