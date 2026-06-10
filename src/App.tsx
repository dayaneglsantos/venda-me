import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { Layout } from "./layouts/Layout";
import { Toaster } from "react-hot-toast";
import { PrivateRoute } from "./components/PrivateRoute";
import ProductForm from "./pages/ProductForm";
import Home from "./pages/Home";
import MyListings from "./pages/MyListings";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/anuncio/:id" element={<h1>Detalhes do Anúncio</h1>} />

          {/* Rotas Privadas */}
          <Route element={<PrivateRoute />}>
            <Route path="/anunciar" element={<ProductForm />} />
            <Route path="/anuncio/:id/editar" element={<ProductForm />} />
            <Route path="/meus-anuncios" element={<MyListings />} />
          </Route>
        </Route>

        <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
      </Routes>
    </>
  );
}

export default App;
