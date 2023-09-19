import { useEffect, useState } from 'react';
import './styles/App.css';

import axios from "axios";

function App() {
  const [ name, setName] = useState(null);
  const [ nations, setNations] = useState([]);

  useEffect(() => {
    const url = name ? `https://restcountries.com/v3.1/name/${name}` : `https://restcountries.com/v3.1/all`;

    axios.get(url)
      .then((response) => {
        const { data } = response;

        setNations(data);
      })
      .catch((error) => {
        console.log(error)
      });
  }, [name]);

  return (
    <div className='home-container'>
      <div className="input-wrapper">
        <input type="text" onChange={(e) => setName(e.target.value)} placeholder='Search country here...' />
      </div>

      <div className="show">
        showing {nations.length} countries
      </div>

      <div className="wrapper-country">
        {
          nations.map((item, index) => {
            return <div className='item' key={index}>
              <img src={item.flags.svg} alt="flag" className="flag" />

              <div className="detail-section">
                <h3 className="title">
                  {item.name.common}
                </h3>
                <div className="detail">
                  <p>{item.region}</p>
                  <p>{item.subregion}</p>
                </div>
              </div>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default App
