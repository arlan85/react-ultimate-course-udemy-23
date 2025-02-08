import { useEffect } from 'react';

export function useKey(key,actionCallback ) {
  useEffect(
    function () {
      function callback(e) {
        if (e.key.toLowerCase() === key.toLowerCase()) {
          actionCallback();
          console.log("CLOSING");
        }
      }

      document.addEventListener("keydown", callback);
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [key, actionCallback]
  );
}