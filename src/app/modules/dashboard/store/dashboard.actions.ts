import { createAction, props } from "@ngrx/store";
import { ICoinData, ITableData } from "../model/dashboard.model";

export const getTableData = createAction('[GET] Get Table Data');
export const getTableDataSuccess = createAction('[GET] Get Table Data Success', props<{tableData: ITableData[]}>());
export const getCoinDataByName = createAction('[GET] Get Table Data By Name', props<{coinData: ICoinData[]}>());