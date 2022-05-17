import { createContext, useContext, useState } from "react";
import { DefaultLoaderValue } from "../types";

const LoaderContext = createContext<DefaultLoaderValue>({
  isLoading: false,
  setIsLoading: () => {},
});

const useLoader = () => useContext(LoaderContext);

const LoaderProvider = ({ children }: { children: JSX.Element }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

export { useLoader, LoaderProvider };
