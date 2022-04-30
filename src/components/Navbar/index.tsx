import { Link } from "react-router-dom";
import { FaUser, FaTrophy } from "react-icons/fa";
import { LocalRoutes } from "../../constants";
import "./style.css";

const Navbar = () => {
  return (
    <nav className="pos-sticky-t0 z-1">
      <div className="nav justify-spc-bet">
        <Link to={LocalRoutes.HOME} className="link">
          <h1 className="nav-heading m-0-5">Astro Quiz</h1>
        </Link>

        <div className="flex-row gap-1 align-center m-0-5">
          <FaTrophy className="sm-icon mr-1 curr-pointer" title="Dashboard" />
          <Link to={LocalRoutes.LOGIN_PAGE} className="link">
            <FaUser className="sm-icon curr-pointer" title="Login" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
