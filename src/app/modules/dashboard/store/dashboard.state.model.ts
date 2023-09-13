import { ICoinData, ITableData } from "../model/dashboard.model";

export interface IDashboardState {
    isLoading: boolean;
    cryptoData: ITableData[];
    coinData: ICoinData;
}