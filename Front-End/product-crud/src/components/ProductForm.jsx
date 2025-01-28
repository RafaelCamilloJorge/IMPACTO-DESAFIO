import React, { useState, useEffect } from "react";
import api from "../services/api";

const ProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
    product || { name: "", description: "", price: 0 }
  );

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({ name: "", description: "", price: 0 });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await api.put(`/Product/${formData.id}`, formData);
      } else {
        await api.post("/Product", formData);
      }
      onSave();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Descrição:</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Preço:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Salvar</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
};

export default ProductForm;
