import Button from "./Button";

export default function ProductCard() {
  return (
    <div className="shadow-md rounded-lg p-3 bg-white">
      <img
        src="https://via.placeholder.com/300x200"
        alt="Produto"
        className="w-full h-48 object-cover rounded-md mb-3"
      />
      <h2 className="text-lg font-semibold mb-1">Título do Produto</h2>
      <p className="text-gray-600 mb-2">
        Descrição breve do produto para atrair o interesse dos compradores.
      </p>
      <p className="text-green-600 font-bold text-xl mb-3">R$ 99,99</p>
      <Button>Ver Detalhes</Button>
    </div>
  );
}
