import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'

import Navbar from '../navbar/Navbar';
import { useParams } from 'react-router-dom';

const stockAPI = import.meta.env.VITE_API;

const companyInfo = import.meta.env.VITE_INFO;
const tok = import.meta.env.VITE_TOK;

const Home = () => {
  const navigate = useNavigate();
  let { stockname } = useParams();
  const [LoggedIn, setLoggedIn] = useState(true);
  const [Money, setMoney] = useState(10000);
  const [StockName, setStockName] = useState('AAPL');
  const [TimeFilter, setTimeFilter] = useState('1D');

  const [stockData, setStockData] = useState({});
  const [CompanyDetails, setCompanyDetails] = useState({ // Dummy data
    "marketCapitalization": 1415993,
    "name": "Apple Inc",
    "shareOutstanding": 4375.47998046875,
    "logo": "https://static.finnhub.io/logo/87cb30d8-80df-11ea-8951-00000000092a.png",
    "finnhubIndustry": "Technology"
  })
  // company with dummy data
  const [CompanyList, setCompanyList] = useState([{ name: 'AAPL', cost: '199' }, { name: 'GOOGL', cost: '201' }, { name: 'MSFT', cost: '100' }]);

  const buyQtyIp = useRef(null);

  const getCompanyData = async (sname) => {
    const res = await fetch(`${companyInfo}symbol=${sname}&token=${tok}`, {
        method: "GET"
    })
    const json = await res.json() ;
    setCompanyDetails(json);
  }

  useEffect(() => {
    buyQtyIp.current.value = 0;
    if (stockname) {
      setStockName(stockname);
      getCompanyData(stockname) ;
    }
    else {
      setStockName('AAPL');
      getCompanyData('AAPL') ;
    }
    
  }, [stockname])
  
  useEffect(() => {
    const socket = new WebSocket(stockAPI);

    // Array of stock symbols to subscribe to
    const stockSymbols = ['AAPL', 'GOOGL', 'MSFT'];

    socket.addEventListener('open', function (event) {
      stockSymbols.forEach(symbol => {
        socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': symbol }));
      });
    });

    socket.addEventListener('message', function (event) {
      const data = JSON.parse(event.data).data;
      if (typeof (data) === 'object') {
        data.forEach(element => {
          setStockData(prevData => ({
            ...prevData,
            [element.s]: element.p.toFixed(2)
          }));
        });
      }
    });

    return () => {
      socket.close();
    };
  }, [])

  const setQuantity = (num) => {
    buyQtyIp.current.value = num;
  }

  return (
    <div id="home" className='flcol'>

      <Navbar LoggedIn={LoggedIn} Money={Money} />

      <div className="home-main f1 flrow">
        <div className="flcol stock-detail">
          <h2 className='stock-name'>{StockName}</h2>
          <p>{stockData[StockName]}</p>
          <p>Stock UpDown</p>
          <img src="https://picsum.photos/700/400" alt="Stockchart" className='stock-chart' />
          <div className="time-option flrow acen">
            <button onClick={() => setTimeFilter('1D')} className='time-btn'>1D</button>
            <button onClick={() => setTimeFilter('1W')} className='time-btn'>1W</button>
            <button onClick={() => setTimeFilter('1M')} className='time-btn'>1M</button>
            <button onClick={() => setTimeFilter('3M')} className='time-btn'>3M</button>
            <button onClick={() => setTimeFilter('1Y')} className='time-btn'>1Y</button>
            <button onClick={() => setTimeFilter('5Y')} className='time-btn'>5Y</button>
          </div>

          <div className="buy-div flcol acen">
            <div className="buy-options flrow acen">
              <button className='buy-btns QTY curpoi' onClick={() => setQuantity(Number(buyQtyIp.current.value) + 5)}>+</button>
              <input type="text" ref={buyQtyIp} className='qty-ip' />
              <button className='buy-btns QTY2 curpoi' onClick={() => setQuantity(Number(buyQtyIp.current.value) - 1)}>-</button>
            </div>
            <button className="BUY buy-btns">BUY</button>
          </div>

          <div className="comp-details flcol">
            <div className="comp flrow acen">
              <img src={CompanyDetails.logo} alt="logo" className='comp-logo' />
              <p>{CompanyDetails.name}</p>
            </div>

            <div className="flrow wrap jcsa">
              <p>Industry  {CompanyDetails.finnhubIndustry}</p>
              <p>Market Capitalization  {CompanyDetails.marketCapitalization}</p>
              <p>Share Outstanding  {CompanyDetails.shareOutstanding}</p>
            </div>

          </div>

        </div>

        <div className="other-stock flcol">
          {CompanyList.map((elem, ind) => {
            if ((elem.name).toLowerCase() !== (StockName).toLowerCase()) return (
              <div key={`comp${ind}`} className='oth-div' onClick={() => navigate(`/${elem.name}`)}>
                <p className='oth-name'>{elem.name}</p>
                <p className='oth-price'>{stockData[elem.name]}</p>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}

export default Home