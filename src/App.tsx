import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<h1>Login</h1>} />
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/anunciar" element={<h1>Formulário de Anúncio</h1>} />
      <Route path="/meus-anuncios" element={<h1>Meus Anúncios</h1>} />
      <Route path="/anuncio/:id" element={<h1>Detalhes do Anúncio</h1>} />
      <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
    </Routes>
  );
}

export default App;
