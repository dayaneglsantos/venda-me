import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { Layout } from "./layouts/Layout";
import { Toaster } from "react-hot-toast";
import { PrivateRoute } from "./components/PrivateRoute";
import ProductForm from "./pages/ProductForm";
import Home from "./pages/Home";
import MyListings from "./pages/MyListings";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/anuncio/:id" element={<ProductDetails />} />

          {/* Rotas Privadas */}
          <Route element={<PrivateRoute />}>
            <Route path="/anunciar" element={<ProductForm />} />
            <Route path="/anuncio/:id/editar" element={<ProductForm />} />
            <Route path="/meus-anuncios" element={<MyListings />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
