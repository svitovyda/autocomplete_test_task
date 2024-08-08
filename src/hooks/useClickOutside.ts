import * as React from 'react';

export const useClickOutside = (refs: React.RefObject<HTMLElement | undefined>[], callback: () => void) => {
  const handleClick = React.useCallback(
    (event: MouseEvent) => {
      if (refs.filter((ref) => ref.current?.contains(event.target as HTMLElement)).length === 0) {
        callback();
      }
    },
    [callback, refs]
  );

  React.useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
