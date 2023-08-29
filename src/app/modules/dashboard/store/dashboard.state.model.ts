import { ITableData } from "../model/dashboard.model";

export interface IDashboardState {
    isLoading: boolean;
    cryptoData: ITableData[];
}