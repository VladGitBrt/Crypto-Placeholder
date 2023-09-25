import { createReducer, on } from "@ngrx/store";
import { IDashboardState } from "./dashboard.state.model";
import * as DashboardActions from './dashboard.actions';
export const initialState: IDashboardState = {
    isLoading: false, 
    cryptoData: [],
    coinData: {
        coinName: "",
        coinPrice: "0",
        dailyPercent: "",
        marketCap: "",
        circulatingSupply: "",
        fullyDiluted: "",
        volume24hr: "",
        marketCapPrice: "",
        circulatingSupplyPrice: "",
        fullyDilutedPrice: "",
        volume24hrPrice: "",
        imageUrl: ""
    },
    chartData: [],
    isCoinDataLoaded: false,
    isChardDataLoaded: false
};

export const reducers = createReducer(initialState, 
    on(DashboardActions.getTableData, (state: IDashboardState)=>({...state, isLoading: true})),
    on(DashboardActions.getTableDataSuccess,(state, action) => ({
        ...state,
        isLoading: false,
        cryptoData: action.tableData
    })),
    on(DashboardActions.loadCoinData,(state: IDashboardState)=>({...state, isLoading: true})),
    on(DashboardActions.loadCoinDataSuccess, (state,action) => ({
        ...state,
        isLoading: false,
        isCoinDataLoaded: true,
        coinData: action.coinData
    })),
    on(DashboardActions.loadChartData,(state: IDashboardState) =>({...state, isLoading: true})),
    on(DashboardActions.loadChartDataSuccess, (state,action) => ({
        ...state,
        isLoading: false,
        isChardDataLoaded: true,
        chartData: action.chartData
    })),
)
