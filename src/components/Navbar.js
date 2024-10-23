import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import ToastContext from '../context/ToastContext';

const Navbar = ({ title= "Contact"}) => {
  const { user, setUser } = useContext(AuthContext);
  const {toast} = useContext(ToastContext);
  const navigate = useNavigate();

return (
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link to="/" style={{textDecoration: "none", fontWeight: 'bold'}}>
        <a className="navbar-brand">{title}</a>
    </Link>

    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarColor04"
      aria-controls="navbarColor04"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarColor04">
      <ul className="navbar-nav ms-auto">
        {user ? (
          <>
            <li className="nav-item my-1">
                <Link to="/create" style={{textDecoration: "none", fontWeight: 'bold'}}>
                    <a className="nav-link">Create</a>
                </Link>
            </li>
            <li className="nav-item my-1">
                <Link to="/mycontacts" style={{textDecoration: "none", fontWeight: 'bold'}}>
                    <a className="nav-link">All Contacts</a>
                </Link>
            </li>
            <li className="nav-item"
              onClick={() => {
              setUser(null);
              localStorage.clear();
              toast.success("Logged out.")
              navigate("./login", { replace: true })
            }}>
                <button className='btn btn-outline-danger'>Logout</button>
            </li>
          </>
          ) : (
          <>
            <li className="nav-item">
                <Link to="/login">
                <a className="nav-link">Login</a>
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/register">
                    <a className="nav-link">Register</a>
                </Link>
            </li>
            <li className="nav-item">
                <button className='btn btn-outline-danger'>Logout</button>
            </li>
          </>
          )
        }

      </ul>
    </div>
  </div>
</nav>
)
}

export default Navbar
