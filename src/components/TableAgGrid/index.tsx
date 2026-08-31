import { useMemo, useState } from "react";
import { AllCommunityModule, type ColDef, themeQuartz } from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";

type ICar = {
  make: string;
  model: string;
  price: number;
  electric: boolean;
  year: number;
};

export const GridExample = () => {
  const [rowData] = useState<ICar[]>([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true, year: 2020 },
    { make: "Ford", model: "F-Series", price: 33850, electric: false, year: 2020 },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false, year: 2021 },
    { make: "Mercedes", model: "EQA", price: 48890, electric: true, year: 2022 },
    { make: "Fiat", model: "500", price: 15774, electric: false, year: 2023 },
    { make: "Nissan", model: "Juke", price: 20675, electric: false, year: 2024 },
  ]);

  const [colDefs] = useState<ColDef<ICar>[]>([
    { field: "make", filter: "agTextColumnFilter" },
    { field: "model", filter: "agTextColumnFilter" },
    { field: "price", filter: "agNumberColumnFilter" },
    { field: "electric", filter: "agTextColumnFilter" },
    { field: "year", filter: "agNumberColumnFilter" },
  ]);

  const defaultColDef = useMemo<ColDef<ICar>>(
    () => ({
      flex: 1,
      filter: true,
      floatingFilter: true,
    }),
    [],
  );

  return (
    <AgGridProvider modules={[AllCommunityModule]}>
      <div style={{ width: "100%", height: "100%" }}>
        <AgGridReact<ICar>
          theme={themeQuartz}
          loadThemeGoogleFonts
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          pagination
          paginationPageSize={20}
          paginationPageSizeSelector={[10, 20, 50, 100]}
        />
      </div>
    </AgGridProvider>
  );
};
