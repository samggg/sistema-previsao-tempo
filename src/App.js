import React, { useState } from 'react';
import { IoMdSearch } from 'react-icons/io';

function App() {
  // Estado para armazenar o nome da cidade
  const [cidade, setCidade] = useState("");
  // Estado para armazenar os dados da previsão do tempo
  const [previsao, setPrevisao] = useState(null);

  // URL da API com a chave e o idioma configurados
  const url = `https://api.weatherapi.com/v1/current.json?key=49f1834cf8264440ad122012240601&q=${cidade}&lang=pt`;

  // Função para lidar com a mudança no input
  const handleChange = (event) => {
    setCidade(event.target.value);
  };

  // Função para lidar com a pesquisa do tempo
  const handleSearch = async () => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setPrevisao(data);
      } else {
        console.error('Erro na chamada à API:', response.statusText);
      }
    } catch (error) {
      console.error('Erro na chamada à API:', error);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <a className="navbar-brand text-white mx-auto" href="#top">
          Previsão do Tempo
        </a>
      </nav>

      <main className="container">
        <div className="jumbotron text-center">
          <h1>Verifique a previsão do tempo da sua cidade!</h1>
          <p className="lead">Digite o nome de sua cidade e clique em Pesquisar</p>

          <div className="row mb-4">
            <div className="col-md-12">
              {/* Input para inserir o nome da cidade */}
              <input
                onChange={handleChange}
                className="form-control"
                value={cidade}
                placeholder="Digite o nome da cidade"
              />
            </div>
          </div>

          {/* Botão de pesquisa */}
          <button onClick={handleSearch} className="btn btn-primary btn-lg">
            <IoMdSearch className="mr-2" /> Pesquisar
          </button>

          {/* Exibição da previsão do tempo, se disponível */}
          {previsao ? (
            <div className="mt-5 d-flex flex-column align-items-center">
              {previsao.current.condition.icon && (
                <div>
                  <img src={previsao.current.condition.icon} alt="Condição do Tempo" />
                </div>
              )}

              <div className="mt-3">
                <h3> Hoje o dia está: {previsao.current.condition.text}</h3>
                <p className='lead'>
                  Temperatura: {previsao.current.temp_c} °C
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default App;
