import { useState } from 'react';
import { IoMdSearch } from 'react-icons/io';

function App() {

  const [cidade, setCidade] = useState("")
  const [previsao, setPrevisao] = useState(null)

  const handleChange = (event) => {
   setCidade(event.target.value)
  }
  const baseURL = `http://api.weatherapi.com/v1/current.json?key=49f1834cf8264440ad122012240601&q=${cidade}&lang=pt`
  const handleSearch = () => {
    fetch(baseURL
      )
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then((data) => {
          setPrevisao(data);
        });
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
              <input 
                onChange={handleChange}
                className="form-control" 
                value={cidade}
                placeholder="Digite o nome da cidade"
              />
            </div>
          </div>

            <button onClick={handleSearch} className="btn btn-primary btn-lg">
              <IoMdSearch className="mr-2" /> Pesquisar
            </button>


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
