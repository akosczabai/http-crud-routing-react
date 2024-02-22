import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import CarForm from "./cars/CarForm";
import HomePage from "./home/HomePage";
import Cars from "./cars/Cars";
import Movies from "./movies/Movies";
import MovieForm from "./movies/MovieForm";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<HomePage />} />
      <Route path="new-car" element={<CarForm />} />
      <Route path="edit-car/:id" element={<CarForm />} />
      <Route path="cars" element={<Cars />} />
      <Route path="new-movie" element={<MovieForm />} />
      <Route path="edit-movie/:id" element={<MovieForm />} />
      <Route path="movies" element={<Movies />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
