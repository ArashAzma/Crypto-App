import React, {createContext, ReactNode} from 'react';

import useWebSocket from './../hooks/useWebSocket';

type SocketContextProps = {
  handleSubscribeToCoinChangeFromSocket: (
    subscribe: 'subscribe' | 'unsubscribe',
    coin: string,
  ) => void;
};
type ContextProviderProps = {
  children?: ReactNode;
};
export const SocketContext = createContext<SocketContextProps | undefined>(
  undefined,
);

export const SocketProvider: React.FC<ContextProviderProps> = ({children}) => {
  const {handleSubscribeToCoinChangeFromSocket} = useWebSocket();

  return (
    <SocketContext.Provider value={{handleSubscribeToCoinChangeFromSocket}}>
      {children}
    </SocketContext.Provider>
  );
};
