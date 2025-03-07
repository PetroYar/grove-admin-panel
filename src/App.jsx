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
import Content from "./pages/content/Content.jsx";
import EditContent from "./pages/content/editContent/EditContent.jsx";
import { Toaster } from "react-hot-toast";
import Reviews from "./pages/reviews/Reviews.jsx";

function App() {
  const { admin } = useAuth();
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute admin={admin} />}>
          <Route element={<Loyout />}>
            <Route path="/" element={<Deshboard />} />
            <Route path="/products-maneger/*" element={<ProductsManeger />} />
            <Route path="/warehouse" element={<Warehouse />} />
            <Route path="/content" element={<Content />} />
            <Route path="/edit-content" element={<EditContent />} />
            <Route path="/reviews" element={<Reviews />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
