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