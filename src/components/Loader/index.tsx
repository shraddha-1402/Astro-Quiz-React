import "./style.css";
import loader from "../../assests/loader.gif";

const Loader = () => {
  return (
    <div className="loader-container">
      <img src={loader} />
    </div>
  );
};

export { Loader };
