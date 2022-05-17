import { Dispatch } from "react";

type DefaultLoaderValue = {
  isLoading: Boolean;
  setIsLoading: Dispatch<React.SetStateAction<boolean>>;
};

export type { DefaultLoaderValue };
