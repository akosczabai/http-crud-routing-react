import React from "react";

import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div className="container-fluid min-vh-100 d-flex flex-column">
      <div className="row hero flex-grow-2">
        <div className="col-12 p-0">
          <nav className="navbar navbar-expand-lg gray-color">
            <div className="container-fluid">
              <a className="navbar-brand" href="/">
                React solution
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <Link to="/" className="nav-link active" aria-current="page">
                    Home
                  </Link>
                  <Link to="cars" className="nav-link">
                    Cars
                  </Link>
                  <Link to="new-car" className="nav-link">
                    New car
                  </Link>
                  <Link to="movies" className="nav-link">
                    Movies
                  </Link>
                  <Link to="new-movie" className="nav-link">
                    New movie
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <Outlet />
      <div className="row flex-grow-2 gray-color white-font">
        <div className="col-12 text-center pt-3">
          <p>@2023 PROGmasters</p>
        </div>
      </div>
    </div>
  );
}

export default App;
