import React, {useContext, useEffect, useState} from "react";
import {Route,Routes} from "react-router-dom";
import ProtectedRoute from "../../protectedRoute";
import Bazaar from "./Bazaar";
import BuyRequest from "./Requests/BuyRequest";
import SellRequest from "./Requests/SellRequest";
import SellReport from "./Reports/SellReport";
import BuyReport from "./Reports/BuyReport";
import BuyGold from "./BuyGold/BuyGold";
import SellGold from "./SellGold/SellGold";
import UserTicket from "./Ticket/UserTicket";
import UserChat from "./Ticket/UserChat";
import CompleteRegistration from "./CompleteRegisteration/CompleteRegistration";
import Dashboard from "./Dashboard";
import dashboard from "../../../contexts/dashboard";

const MainSection = () => {
    const context = useContext(dashboard)
    return (
        <>
            <Routes>
                <Route path="/home" element={<ProtectedRoute><Bazaar/></ProtectedRoute>}/>
                <Route path="/buy-request" element={<ProtectedRoute><BuyRequest/></ProtectedRoute>}/>
                <Route path="/sell-request" element={<ProtectedRoute><SellRequest/></ProtectedRoute>}/>
                <Route path="/sell-report" element={<ProtectedRoute><SellReport/></ProtectedRoute>}/>
                <Route path="/buy-report" element={<ProtectedRoute><BuyReport/></ProtectedRoute>}/>
                {
                    context.completeRegistrationStatus ?
                        <Route path="/buy-gold" element={<ProtectedRoute><BuyGold/></ProtectedRoute>}/> : null
                }
                {
                    context.completeRegistrationStatus ?
                        <Route path="/sell-gold" element={<ProtectedRoute><SellGold/></ProtectedRoute>}/> : null
                }
                <Route path="/ticket" element={<ProtectedRoute><UserTicket/></ProtectedRoute>}/>
                <Route path="/ticket/:id" element={<ProtectedRoute><UserChat/></ProtectedRoute>}/>
                <Route path="/complete-info" element={<ProtectedRoute><CompleteRegistration/></ProtectedRoute>}/>
            </Routes>
        </>
    )
}
export default MainSection;
