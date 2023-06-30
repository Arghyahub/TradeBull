import { useState } from 'react'
import './Auth.css'

const Auth = () => {
  const [newUser, setnewUser] = useState(true);
  const [Pass, setPass] = useState(true) ;

  const signup = (e) => {
    e.preventDefault() ;
  }

  const login = (e) => {
    e.preventDefault() ;
  }

  return (
    <div id='Auth' className='h100 flrow'>

      <div className='h100 w50 img-div'>
        <img className='auth-img' src="images/stockauth.jpg" alt="stockimg" />
        <div className="img-txt">Practice Stock Trading For Free</div>
      </div>

      <div className='h100 w50 auth-div flcol  jcen acen'>
        <img src="images/stockicon.svg" alt="icon" className="auth-icon" />
        <div className="auth-text">
          <h1>Hello Trader</h1>
          <p className='auth-p'>Welcome to TradeBull, your one stop solution to learn trading</p>

          {newUser ? (
            <>
            <form onSubmit={signup} className='flcol acen auth-form'>
              <div className="ip flrow jcen acen">
                <input type="text" name='name' placeholder='Name' className='auth-ip'/>
                <img src="images/name.ico" alt="" />
              </div>
              <div className="ip flrow jcen acen">
                <input type="text" name='email' placeholder='Email@' className='auth-ip'/>
                <img src="images/email.ico" alt="" />
              </div>
              <div className="ip flrow jcen acen">
                <input type={Pass? 'password' : 'text'} name='passwd' placeholder='Password' className='auth-ip'/>
                <button className='curpoi pass-btn' onClick={() => setPass(!Pass)}>
                  <img src={`images/${Pass? 'eyenot':'eye'}.ico`} alt="" />
                </button>
              </div>
              <button type="submit" className='curpoi auth-sub'>Sign up</button>
            </form>

            <p>Have an account? 
              <button className='curpoi swap-auth-btn' onClick={ () => setnewUser(false) }>Log in..</button>
            </p>
            </>
          ) : (
            <>
            <form onSubmit={login} className='flcol acen auth-form'>
              <div className="ip flrow jcen acen">
                <input type="text" name='email' placeholder='Email@' className='auth-ip'/>
                <img src="images/email.ico" alt="" />
              </div>
              <div className="ip flrow jcen acen">
                <input type={Pass? 'password' : 'text'} name='passwd' placeholder='Password' className='auth-ip'/>
                <button className='curpoi pass-btn' onClick={() => setPass(!Pass)}>
                  <img src={`images/${Pass? 'eyenot':'eye'}.ico`} alt="" />
                </button>
              </div>
              <button type="submit" className='curpoi auth-sub'>Log in</button>
            </form>

            <p>Dont you have an account?
              <button className='curpoi swap-auth-btn' onClick={ () => setnewUser(true) }>Sign up..</button>
            </p>
            </>
          )}

        </div>
      </div>

    </div>
  )
}

export default Auth