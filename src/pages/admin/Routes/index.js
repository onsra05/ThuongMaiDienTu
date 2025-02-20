// AdminRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../adminLayout";
import Dashboard from "../dashboard";
import Products from "../products";
import Orders from "../orders";
import Customers from "../customers";
import Reports from "../reports";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="" element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="customers" element={<Customers />} />
        <Route path="reports" element={<Reports />} />
        <Route path="*" element={<div className="page"><h2>404</h2><p>Không tìm thấy trang.</p></div>} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
