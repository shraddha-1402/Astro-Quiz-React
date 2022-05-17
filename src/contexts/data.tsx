import { createContext, useContext, useReducer } from "react";
import { dataReducer } from "../reducers";
import { DefaultData } from "../types";
import { dataStateValue } from "../constants";

const DataContext = createContext<DefaultData>({
  dataState: dataStateValue,
  dataDispatch: () => {},
});

const useData = () => useContext(DataContext);

const DataProvider = ({ children }: { children: JSX.Element }) => {
  const [dataState, dataDispatch] = useReducer(dataReducer, dataStateValue);
  return (
    <DataContext.Provider value={{ dataState, dataDispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export { useData, DataProvider };
