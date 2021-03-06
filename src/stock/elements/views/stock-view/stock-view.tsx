import React from "react";
import {AppContent} from "../../../../main/components/app-layout";
import {useProductsQuery} from "../../../../main/lib/generated";
import {RefetchProductsContext} from "./lib/use-refetch-products";
import StockHeader from "./stock-header";
import StockTable from "./stock-table";

export default function StockView() {
  const {data, refetch} = useProductsQuery();
  return (
    <AppContent title="Склад">
      <RefetchProductsContext.Provider value={{refetch}}>
        <StockHeader />
        <StockTable data={data?.products ?? []} />
      </RefetchProductsContext.Provider>
    </AppContent>
  );
}
