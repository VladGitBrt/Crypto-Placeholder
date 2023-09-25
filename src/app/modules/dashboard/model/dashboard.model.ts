export interface ITableData {
    number: string;
    coinName: string;
    coinPrice: string;
    dailyPercent: string;
    dailyHigh: string;
    dailyLow: string;
    imageUrl: string;
}

export interface ICoinData {
    coinName: string;
    coinPrice: string;
    dailyPercent: string;
    marketCap: string;
    circulatingSupply: string;
    fullyDiluted: string;
    volume24hr: string;
    marketCapPrice: string;
    circulatingSupplyPrice: string;
    fullyDilutedPrice: string;
    volume24hrPrice: string;
    imageUrl: string;
}

export interface ICoinListResponse {
    Response: string,
    Message: string,
    HasWarning: false,
    Type: number,
    RateLimit: {},
    Data: ICoinListItemResponse
}

export interface ICoinListItemResponse {
    id: number,
    symbol: string,
    partner_symbol: string,
    data_available_from: number
}

export interface IChartData {
    high: number;
    low: number;
    open: number; 
    close: number;
    time: number;
}