import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/core/interfaces/app.state.interface";

export const selectFeature = (state: AppStateInterface) => state.dashboard;

export const isLoadingSelector = createSelector(
    selectFeature,
    (state) => state.isLoading
);

export const cryptoDataSelector = createSelector(
  selectFeature,
  (state) => state.cryptoData
);