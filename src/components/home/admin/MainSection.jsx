import React, {useContext, useEffect, useState} from "react";
import {Route,Routes} from "react-router-dom";
import ProtectedRoute from "../../protectedRoute";
import dashboard from "../../../contexts/dashboard";
import GoldPriceRecord from "./GoldPriceRecord";
import ConfirmBuyGold from "./ConfirmBuyGold";
import ConfirmSellGold from "./ConfirmSellGold";
import AdminTicket from "./Ticket/UserTicket";
import AdminChat from "./Ticket/UserChat";
import NewBlog from "./NewBlog"
import EditBlog from './EditBlog';
import Blogs from "./Blogs"
import AddCoin from "./AddCoin"
import ConfirmWithDrawMoney from "./ConfirmWithDrawMoney";

const MainSection = () => {
    const context = useContext(dashboard)
    return (
        <>
            <Routes>
                <Route path="/gold-price" element={<ProtectedRoute><GoldPriceRecord /></ProtectedRoute>} />
                <Route path="/confirm-buy" element={<ProtectedRoute><ConfirmBuyGold /></ProtectedRoute>} />
                <Route path="/confirm-sell" element={<ProtectedRoute><ConfirmSellGold /></ProtectedRoute>} />
                <Route path="/confirm-with-draw" element={<ProtectedRoute><ConfirmWithDrawMoney /></ProtectedRoute>} />
                <Route path="/add-coin" element={<ProtectedRoute><AddCoin /></ProtectedRoute>} />
                <Route path="/new-blog" element={<ProtectedRoute><NewBlog /></ProtectedRoute>} />
                <Route path="/edit-blog" element={<ProtectedRoute><EditBlog /></ProtectedRoute>} />
                <Route path="/blogs" element={<ProtectedRoute><Blogs /></ProtectedRoute>} />
                <Route path="/ticket" element={<ProtectedRoute><AdminTicket /></ProtectedRoute>} />
                <Route path="/ticket/:id" element={<ProtectedRoute><AdminChat /></ProtectedRoute>} />
            </Routes>
        </>
    )
}
export default MainSection;
