import { IChartData, ICoinData, ITableData } from "../model/dashboard.model";

export interface IDashboardState {
    isLoading: boolean;
    cryptoData: ITableData[];
    chartData: IChartData[];
    coinData: ICoinData;
    isCoinDataLoaded: boolean;
    isChardDataLoaded: boolean;
}