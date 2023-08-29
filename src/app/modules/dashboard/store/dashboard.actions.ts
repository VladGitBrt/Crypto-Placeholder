import { createAction, props } from "@ngrx/store";
import { ITableData } from "../model/dashboard.model";

export const getTableData = createAction('[GET] Get Table Data');
export const getTableDataSuccess = createAction('[GET] Get Table Data Success', props<{tableData: ITableData[]}>());