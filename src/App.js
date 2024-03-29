import React, { Component, useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./style/App.css";
import "./style/reset.css";
import SignupOrLogin from "./components/home/Signup/SignupOrLogin";
import Success from "./components/home/Signup/Success";
import Signup from "./components/home/Signup/Signup";
import Login from "./components/home/Signup/Login";
import CreatePassword from "./components/home/Signup/CreatePassword";
import Dashboard from "./components/home/dashboard/Dashboard";
import signup from "./contexts/signup";
import AdminDashboard from "./components/home/admin/Dashboard";
import ConfirmBuyGold from "./components/home/admin/ConfirmBuyGold";
import ConfirmSellGold from "./components/home/admin/ConfirmSellGold";
import GoldPriceRecord from "./components/home/admin/GoldPriceRecord";
import AdminTicket from "./components/home/admin/Ticket/UserTicket";
import AdminChat from "./components/home/admin/Ticket/UserChat";
import ProtectedRoute from "./components/protectedRoute";
import ProtectedLogin from "./components/ProtectedLogin";
import ContactUs from "./components/home/HomePage/ContactUs/ContactUs";
import AboutUs from "./components/home/HomePage/AboutUs/AboutUs";
import Services from "./components/home/HomePage/Services/Services";
import MainHomePage from "./components/home/HomePage/MainHomePage";
import WebServer from "./components/WebServer";
import NotFound from "./components/Other/NotFound";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ManagerDashboard from "./components/home/Manager1/Dashboard";
import Blog from "./components/home/HomePage/Blog/Blog";
import Blog2 from "./components/home/HomePage/Blog/Blog2";
import Rules from "./components/home/HomePage/Rules/Rules";
import Education from "./components/home/HomePage/Education/Education";
import ForgotPass from "./components/home/Signup/ForgotPass/ForgotPass";

const App = () => {
  const [OTPAllowed, setOTPAllowed] = useState(false);
  const [passwordAllowed, setPasswordAllowed] = useState(false);
  const [dashboardAllowed, setDashboardAllowed] = useState(false);
  const [createPassAllowed, setCreatePassAllowed] = useState(false);
  const [successAllowed, setSuccessAllowed] = useState(false);
  const [
    accountCompleteRegistrationAllowed,
    setAccountCompleteRegistrationAllowed,
  ] = useState(true);
  const [accountInfo, setAccountInfo] = useState({
    id: "",
    phoneNumber: "",
    registerDate: "",
    infos: [],
    zarinpalRequests: [],
    tickets: [],
    requests: [],
    wallet: {
      id: "",
      inventory: 0,
      weight: 0,
    },
    verified: false,
  });
  const [verified, setVerified] = useState(false);
  const [selected, setSelected] = useState("bazaar");
  const [newUserPhoneNumber, setNewUserPhoneNumber] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");

  return (
    <>
      <signup.Provider
        value={{
          setOTPAllowed: setOTPAllowed,
          OTPAllowed: OTPAllowed,

          passwordAllowed: passwordAllowed,
          setPasswordAllowed: setPasswordAllowed,

          dashboardAllowed: dashboardAllowed,
          setDashboardAllowed: setDashboardAllowed,

          createPassAllowed: createPassAllowed,
          setCreatePassAllowed: setCreatePassAllowed,

          successAllowed: successAllowed,
          setSuccessAllowed: setSuccessAllowed,

          verified: verified,
          setVerified: setVerified,

          accountInfo: accountInfo,
          setAccountInfo: setAccountInfo,

          selected: selected,
          setSelected: setSelected,

          accountCompleteRegistrationAllowed:
            accountCompleteRegistrationAllowed,
          setAccountCompleteRegistrationAllowed:
            setAccountCompleteRegistrationAllowed,

          newUserPhoneNumber: newUserPhoneNumber,
          setNewUserPhoneNumber: setNewUserPhoneNumber,

          newUserPassword: newUserPassword,
          setNewUserPassword: setNewUserPassword,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route exact path="/" element={<MainHomePage />} />
            <Route path="/webserver" element={<WebServer />} />
            <Route
              path="/login"
              element={
                <ProtectedLogin>
                  <SignupOrLogin />
                </ProtectedLogin>
              }
            />
            <Route path="/OTP-code/:id" element={<Signup />} />
            <Route path="/password" element={<Login />} />
            <Route path="/welcome" element={<Success />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/services" element={<Services />} />
              <Route path="/rules" element={<Rules/>} />
              <Route path="/education" element={<Education/>} />
            <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<Blog2 />} />
            <Route path="/create-password" element={<CreatePassword />} />
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manager/*"
              element={
                <ProtectedRoute>
                  <ManagerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            >
              {/*<Route path="price-record" element={<GoldPriceRecord />} />*/}
              <Route
                path="gold-price"
                element={
                  <ProtectedRoute>
                    <GoldPriceRecord />
                  </ProtectedRoute>
                }
              />
              <Route
                path="confirm-buy"
                element={
                  <ProtectedRoute>
                    <ConfirmBuyGold />
                  </ProtectedRoute>
                }
              />
              <Route
                path="confirm-sell"
                element={
                  <ProtectedRoute>
                    <ConfirmSellGold />
                  </ProtectedRoute>
                }
              />
              <Route
                path="ticket"
                element={
                  <ProtectedRoute>
                    <AdminTicket />
                  </ProtectedRoute>
                }
              />
              <Route
                path="ticket/:id"
                element={
                  <ProtectedRoute>
                    <AdminChat />
                  </ProtectedRoute>
                }
              />
            </Route>
            {/*<Route path="/manager/add-admin" element={(<ProtectedRoute><AddAdmin/></ProtectedRoute>)}/>*/}
            <Route path="/forgot-password" element={<ForgotPass />} />
            {/*<Route path="/accountCompleteRegistration" element={(<CompleteRegistration/>)}/>*/}
          </Routes>
        </BrowserRouter>
      </signup.Provider>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default App;
