import React,{useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import Coin from './component/Coin/Coin';

function App() {

  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('');

  useEffect(()=>{
    axios.get('https://api.coinstats.app/public/v1/coins?skip=0&limit=20&currency=USD')
    .then(res=>{
      setCoins(res.data.coins) 
      //console.log(res.data,"asd");
    })
    .catch(error=>console.log(error));
  }, []);
console.log(coins);
  const handleChange = e => {
    setSearch(e.target.value);
  }
  const filteredCoins = coins.filter(coin=>
    coin.name.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input type="text" placeholder="Search" 
          className="coin-input" onChange={handleChange}/>  
        </form>  
      </div>
      <div className="head-row">
      <div className="head">
        <p>Name</p>
      </div> 
      </div> 
      {filteredCoins.map(coin=>{
        return <Coin
        key={coin.id}
        name={coin.name}
        icon={coin.icon}
        symbol={coin.symbol}
        marketcap={coin.marketCap}
        price={coin.current_price}
        priceChange={coin.priceChange1d}
        volume={coin.volume}
        />
      })}
    </div>
  );
}

export default App;
