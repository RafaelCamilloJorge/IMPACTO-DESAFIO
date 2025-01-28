import React, { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import api from "./services/api";
import './App.css';

const App = () => {
  const [selectedProduct, setSelectedProduct] = useState(null); // Controle do produto selecionado
  const [products, setProducts] = useState([]); // Lista de produtos

  // Função para carregar os produtos
  const loadProducts = async () => {
    try {
      const response = await api.get('/Product');
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  };

  // Carregar produtos quando o componente for montado
  useEffect(() => {
    loadProducts();
  }, []);

  // Função para editar o produto
  const handleEdit = (product) => {
    setSelectedProduct(product); // Define o produto selecionado para edição
  };

  // Função para excluir o produto
  const handleDelete = async (id) => {
    try {
      await api.delete(`/Product/${id}`);
      alert("Produto excluído com sucesso!");
      loadProducts();  // Atualiza a lista de produtos após a exclusão
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
    }
  };

  // Função chamada ao salvar o produto
  const handleSave = async () => {
    setSelectedProduct(null);  // Limpa a seleção do produto após salvar
    loadProducts();  // Atualiza a lista de produtos após salvar ou editar
  };

  // Função para cancelar a edição
  const handleCancel = () => {
    setSelectedProduct(null);  // Limpa a seleção do produto ao cancelar
  };

  return (
    <div>
      <h1>Gerenciador de Produtos</h1>

      {/* Renderiza o formulário de acordo com o estado do produto selecionado */}
      <ProductForm 
        product={selectedProduct} 
        onSave={handleSave} 
        onCancel={handleCancel} 
      />

      {/* Passa a lista de produtos e funções de edição/exclusão para o ProductList */}
      <ProductList 
        products={products} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
    </div>
  );
};

export default App;
