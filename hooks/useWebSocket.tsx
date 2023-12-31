import {useEffect, useState} from 'react';

import {state$} from '../GlobalState';

const WEB_SOCKET_URL = 'ws://192.168.1.100:4236';
// const WEB_SOCKET_URL = 'ws://10.0.0.11:4236';

const useWebSocket = () => {
  const [socket] = useState(() => new WebSocket(WEB_SOCKET_URL));

  useEffect(() => {
    socket.onopen = () => {
      console.log(`WebSocket connected to ${WEB_SOCKET_URL}`);
      socket.send(
        JSON.stringify({
          event: 'subscribeCoinPrice',
          coin: state$.pinnedCoin.name.peek(),
        }),
      );
    };

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      switch (newData.event) {
        case 'fearAndGreedIndex': {
          state$.fearAndGreedIndex.set(newData.index);
          break;
        }
        case 'dollarPrice': {
          state$.dollarPriceInToman.set(newData.price);
          break;
        }
        case 'coinPrice': {
          if (state$.pinnedCoin.priceHistory.length >= 20) {
            state$.pinnedCoin.priceHistory.shift();
          }
          state$.pinnedCoin.priceHistory.push(newData.price);
          break;
        }
        default: {
          break;
        }
      }
    };

    socket.onclose = () => {
      console.log(`WebSocket connection to ${WEB_SOCKET_URL} closed`);
    };

    return () => {
      socket?.close();
    };
  }, []);

  const handleSubscribeToCoinChangeFromSocket = (
    subscribe: 'subscribe' | 'unsubscribe',
    coin: string,
  ) => {
    socket.send(
      JSON.stringify({
        event:
          subscribe === 'subscribe'
            ? 'subscribeCoinPrice'
            : 'unsubscribeCoinPrice',
        coin,
      }),
    );
  };

  return {handleSubscribeToCoinChangeFromSocket};
};

export default useWebSocket;
