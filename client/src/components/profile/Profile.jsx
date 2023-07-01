import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Profile.css'

const Profile = () => {
  const [UserData, setUserData] = useState({ 
    name: "Dummy" ,
    profit : 1000 ,
    loss : 100 ,
    balance : 900,
    history : [
      { stock: 'APPL' , buyDate: "01/02/2023" , sellDate: "01/04/2023" , buyCost: 192 , sellCost: 182 , profit: -100 },
      { stock: 'GOOG' , buyDate: "01/02/2023" , sellDate: "01/04/2023" , buyCost: 182 , sellCost: 192 , profit: 100 },
      { stock: 'NVDA' , buyDate: "01/02/2023" , sellDate: "01/04/2023" , buyCost: 112 , sellCost: 192 , profit: 800 },
    ]
  })

  const handleLogout = () => {
    // Handles logout , deletes token
  }

  useEffect(() => {
    // On load, fetches datat into UserData from Backend
  }, [])
  


  return (
    <div id="Profile" className='h100 flcol jcen acen'>
      
      <div className="profile-nav flrow acen w100">
        <div className="prof-logo flrow acen">
          <img src="images/MainIcon.png" alt="Logo" />
          <p>TradeBull</p>
        </div>
        <div className="prof-options">
          <Link to={'/'} className='prof-ln'>Home</Link>
          <button className='prof-log curpoi' onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <img src="images/UserProfile.png" alt="profile icon" className='prof-img'/>
      <h2 className='usr-name'>{UserData.name}</h2>
      <div className="flrow prof-stats ">
        <div>Profit : <span className='gain'>{UserData.profit}</span></div>
        <div>Loss : <span className='loss'>{UserData.loss}</span></div>
      </div>

      <h2 className='trade-hist'>Trade History</h2>
      <table className='history-table'>
        <tbody>

          <tr>
            <th>Stock</th>
            <th>Date</th>
            <th>Price</th>
            <th>Profit/Loss</th>
          </tr>

          {UserData.history.map((elem,ind) => (
            <tr key={`stock${ind}`}>
              <td>{elem.stock}</td>

              <td><div className="flcol">
                <p>Buy : {elem.buyDate}</p>
                <p>Sell : {elem.sellDate}</p>
              </div></td>

              <td><div className="flcol">
                <p>Buy : {elem.buyCost}$</p>
                <p>Sell : {elem.sellCost}$</p>
              </div></td>

              <td className={`${(elem.profit>=0)? 'gain':'loss'}`} ><p>{elem.profit}</p></td>

            </tr>
          ))}

        </tbody>
      </table>

    </div>
  )
}

export default Profile