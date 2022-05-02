import { useLocation } from "react-router-dom";
import { LocalRoutes } from "../constants";

const useDynamicTitle = () => {
  const { pathname } = useLocation();
  if (pathname !== LocalRoutes.HOME) {
    document.title = `AQ | ${pathname
      .split("/")[1]
      .split("-")
      .join(" ")
      .toUpperCase()}`;
  } else document.title = "AQ | HOME";
  return { pathname };
};

export { useDynamicTitle };
