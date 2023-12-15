import { Outlet, Link, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();

  // Check if the user is authenticated
  const isAuthenticated = localStorage.getItem("token") !== null;

  const handleLogout = (e) => {
    e.preventDefault();

    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Personal Accountant
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>

              {!isAuthenticated && (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              )}

              {isAuthenticated && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/pl">
                      P&L
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/add">
                      Add
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/reports">
                      Reports
                    </Link>
                  </li>
                </>
              )}
            </ul>
            {isAuthenticated && (
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/logout"
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
