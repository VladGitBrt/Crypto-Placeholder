import { createReducer, on } from "@ngrx/store";
import { IDashboardState } from "./dashboard.state.model";
import * as DashboardActions from './dashboard.actions';
export const initialState: IDashboardState = {
    isLoading: false, 
    cryptoData: [
        // {
        //     number: "1",
        //     coinName: "string",
        //     coinPrice: "string",
        //     dailyPercent: "string",
        //     dailyHigh: "string",
        //     dailyLow: "string",
        //     imageUrl: 'sample'
        // }
    ]
};

export const reducers = createReducer(initialState, 
    on(DashboardActions.getTableData, (state: IDashboardState)=>({...state, isLoading: true})),
    on(DashboardActions.getTableDataSuccess,(state, action) => ({
        ...state,
        isLoading: false,
        cryptoData: action.tableData
    }))    
)
