export type Coin = {
  name: CoinName;
  price: number;
};
export type Currency = 'Dollar' | 'Toman';
export type CoinName =
  | 'bitcoin'
  | 'ethereum'
  | 'bnb'
  | 'xrp'
  | 'solana'
  | 'cardano'
  | 'dogecoin'
  | 'tron'
  | 'fantom'
  | 'litecoin';
