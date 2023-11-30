export type Coin = {
  name: CoinName;
  price: number;
};
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

export type Gender = 'Male' | 'Female' | undefined;

export type RadioButtonType = {
  color?: string;
  id: string;
  key?: string;
  label: string;
  onPress?: (id: string) => void;
  selected?: boolean;
};
