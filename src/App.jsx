import "./styles/reset.css";
import "./styles/App.css";

import { Routes, Route } from "react-router-dom";
import Loyout from "./components/loyout/Loyout";
import Deshboard from "./pages/deshboard/Deshboard";

import Warehouse from "./pages/warehouse/Warehouse";
import Login from "./pages/login/Login";
import { useAuth } from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductsManeger from "./pages/productsManeger/ProductsManeger.jsx";

function App() {
  const { admin } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute admin={admin} />}>
        <Route element={<Loyout />}>
          <Route path="/" element={<Deshboard />} />
          <Route path="/productsManeger/*" element={<ProductsManeger />} />
          <Route path="/warehouse" element={<Warehouse />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
