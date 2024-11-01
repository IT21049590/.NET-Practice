import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./src/components/Navbar";
import EmployeeTable from "./src/components/EmployeeTable";
import DepartmentTable from "./src/components/DepartmentTable";
import { ToastContainer } from "react-toastify";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/employees" element={<EmployeeTable />} />
          <Route path="/departments" element={<DepartmentTable />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;
