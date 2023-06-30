import { Link } from "react-router-dom"

import "./Navbar.css"

const Navbar = ({ LoggedIn , Money }) => {
  return (
    <div className="home-nav flrow acen">
      <img src="images/MainIcon.png" alt="Icon" className='home-icon' />
      <h4>TradeBull</h4>
      {LoggedIn ? (
        <div className='navlog flrow'>
          <Link to={"/profile"} className='nav-prof flrow acen'>
            <img src="images/name.ico" alt="user" className='nav-icons' />
            <p>Profile</p>
          </Link>
          <div className="money flrow acen">
            <img src="/images/money.png" alt="money" className='nav-icons' />
            <p className='money-clr'>{Money}$</p>
          </div>
        </div>
      ) : (
        <div className='navlog flrow'>
          <p>Get Free <span className='money-clr'>10,000$</span> to Trade</p>
          <Link to={'/auth'} className='nav-auth'><p>SignUp Now</p></Link>
        </div>
      )}
    </div>
  )
}

export default Navbar