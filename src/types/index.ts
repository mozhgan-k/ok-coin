export interface ITicker {
  best_ask: string;
  best_bid: number;
  high_24h: number
  last: string;
  low_24h: number;
  open_24h: string;
  symbol: string;
  ts: number,
  vol_24h: number;
  vol_24h_pair: number;
  difference_24: number;
  formattedPrice: string
}

export interface ILiveData {
  best_ask: string;
  best_bid: number;
  high24h: number
  last: string;
  low24h: number;
  open_24h: string;
  symbol: string;
  instId: string;
  ts: number,
  vol_24h: number;
  vol_24h_pair: number;
  difference_24: number;
  formattedPrice: string
}