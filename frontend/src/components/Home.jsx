import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'; 

const Home = () => {
  const [bicicletas, setBicicletas] = useState([]);
  const URL_API = 'http://localhost:3000/bicicletas'; 

 
  const mostrarBicicletas = async () => {
    try {
      const response = await axios.get(`${URL_API}/bicicletas`);
      setBicicletas(response.data); 
    } catch (error) {
      console.log('Erro ao buscar bicicletas:', error);
    }
  };

  
  useEffect(() => {
    mostrarBicicletas();
  }, []); 

  return (
    <div>
      <h1>Bicicletas Disponíveis</h1>
      
      <div className="bicicletas-grid">
        {bicicletas.length === 0 ? (
          <p>Não há bicicletas disponíveis.</p>
        ) : (
          bicicletas.map((bicicleta) => (
            <div className="bicicleta-card" key={bicicleta.id}>
              <img 
                src={bicicleta.imagem} 
                alt={bicicleta.nome} 
                className="bicicleta-img" 
                onError={(e) => e.target.src = "default-image.jpg"}  
              />
              <h2>{bicicleta.nome}</h2>
              <p>{bicicleta.descricao}</p>
              <p>Preço: R$ {bicicleta.preco}</p>
              <p>Modelo {bicicleta.modelo}</p>
              <p>Estoque: {bicicleta.estoque}</p>
            </div>
          ))
        )}
      </div>
    </div>
)
}
export default Home;