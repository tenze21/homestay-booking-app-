import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/styles/base.css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import reportWebVitals from "./reportWebVitals";
import PrivateRoute from "./components/PrivateRoutes";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import HomestayPage from "./pages/HomestayPage";
import BasicInformation from "./pages/BasicInformation";
import ServiceSetup from "./pages/ServiceSetup.jsx";
import FinishUp from "./pages/FinishUp.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import BookReservationPage from "./pages/BookReservationPage.jsx";
import ReservationPage from "./pages/ReservationPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import PasswordUpdatePage from "./pages/PasswordUpdatePage.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/homestay/:id" element={<HomestayPage />} />
      <Route path="" element={<PrivateRoute />}>
        <Route
          path="/property_listing/basic_information"
          element={<BasicInformation />}
        />
        <Route
          path="/property_listing/service_setup"
          element={<ServiceSetup />}
        />
        <Route path="/property_listing/finish_up" element={<FinishUp />} />
        <Route path="/reservation/payment" element={<PaymentPage />} />
        <Route path="/reservation/book" element={<BookReservationPage />} />
        <Route path="/reservation/:id" element={<ReservationPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/updatepassword" element={<PasswordUpdatePage />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
