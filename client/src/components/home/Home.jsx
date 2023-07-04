import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'

import Navbar from '../navbar/Navbar';
import { useParams } from 'react-router-dom';

// const key=import.meta.env.VITE_APIKEY;

const Home = () => {
  const navigate = useNavigate() ;
  const { stockname } = useParams() ;
  const [LoggedIn, setLoggedIn] = useState(true) ;
  const [Money, setMoney] = useState(10000) ;
  const [StockName, setStockName] = useState('APPl') ;
  const [TimeFilter, setTimeFilter] = useState('1D') ;
  const [CompanyDetails, setCompanyDetails] = useState({
    "marketCapitalization": 1415993,
    "name": "Apple Inc",
    "shareOutstanding": 4375.47998046875,
    "logo": "https://static.finnhub.io/logo/87cb30d8-80df-11ea-8951-00000000092a.png",
    "finnhubIndustry":"Technology"
  })
  const [CompanyList, setCompanyList] = useState([{name: 'APPL', cost: '199'}, {name: 'Google', cost: '201'}, {name: 'Microsoft', cost: '500'},{name: 'NVIDIA', cost: '900'}]) ;

  const buyQtyIp = useRef(null) ;

  useEffect(() => {
  }, [])
  


  useEffect(() => {
    buyQtyIp.current.value = 0;
    if (stockname){
      setStockName(stockname) ;
    }

  }, [stockname])
  
  const setQuantity = (num) => {
    buyQtyIp.current.value = num;
  }

  return (
    <div id="home" className='flcol'>

      <Navbar LoggedIn={LoggedIn} Money={Money} />

      <div className="home-main f1 flrow">
        <div className="flcol stock-detail">
          <h2 className='stock-name'>{StockName}</h2>
          <p>192$</p>
          <p>Stock UpDown</p>
          <img src="https://picsum.photos/700/400" alt="Stockchart" className='stock-chart'/>
          <div className="time-option flrow acen">
            <button onClick={() => setTimeFilter('1D') } className='time-btn'>1D</button>
            <button onClick={() => setTimeFilter('1W') } className='time-btn'>1W</button>
            <button onClick={() => setTimeFilter('1M') } className='time-btn'>1M</button>
            <button onClick={() => setTimeFilter('3M') } className='time-btn'>3M</button>
            <button onClick={() => setTimeFilter('1Y') } className='time-btn'>1Y</button>
            <button onClick={() => setTimeFilter('5Y') } className='time-btn'>5Y</button>
          </div>

          <div className="buy-div flcol acen">
            <div className="buy-options flrow acen">
              <button className='buy-btns QTY curpoi' onClick={() => setQuantity( Number(buyQtyIp.current.value) + 5 )}>+</button>
              <input type="text" ref={buyQtyIp} className='qty-ip'/>
              <button className='buy-btns QTY2 curpoi' onClick={() => setQuantity( Number(buyQtyIp.current.value) - 1 )}>-</button>
            </div>
            <button className="BUY buy-btns">BUY</button>
          </div>

          <div className="comp-details flcol">
            <div className="comp flrow acen">
              <img src={CompanyDetails.logo} alt="logo" className='comp-logo'/>
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
          { CompanyList.map((elem,ind) => {
              if ((elem.name).toLowerCase() !== (StockName).toLowerCase() ) return(
              <div key={`comp${ind}`} className='oth-div' onClick={() => navigate(`/${elem.name}`)}>
                <p className='oth-name'>{elem.name}</p>
                <p className='oth-price'>{elem.cost}</p>
              </div>
              )
            }) }
        </div>

      </div>
    </div>
  )
}

export default Home