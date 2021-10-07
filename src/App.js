import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updateProfile } from 'firebase/auth'
import { useState } from 'react';
import './App.css';
import initAuth from './Firebase/Init';

initAuth()

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogIn, setIsLogIn] = useState(false)

  const auth = getAuth();

  const handleName = e => {
    setName(e.target.value)
  }
  const handleEmail = e => {
    setEmail(e.target.value)
  }
  const handlePassword = e => {
    setPassword(e.target.value)
  }

  const toggleCheckBox = e => {
    setIsLogIn(e.target.checked)
  }

  const handleRegister = e => {
    e.preventDefault();
    if (password.length < 6) {
      setError('password must be 6 character');
      return;
    }
    isLogIn ? userLogin(email, password) : createUser(email, password)

  }

  const userLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user
        console.log(user)
        setError("")
      })
      .catch(error => {
        setError(error.message)
      })
  }

  const createUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        setError('');
        verifyEMail();
        setUsername();

      })
      .catch(error => {
        setError(error.message)
      })
  }

  const verifyEMail = () => {
    sendEmailVerification(auth.currentUser)
      .then(result => {

      })
  }

  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(result => {

      })
  }
  const setUsername = () => {
    updateProfile(auth.currentUser, { displayName: name })
      .then(result => { })
  }

  return (
    <div className="App">
      <h3>Please {isLogIn ? "Login" : "Register"}</h3>
      <form onSubmit={handleRegister} className='reg-form'>
        {!isLogIn && <div className='field'>
          <label htmlFor="name">Name</label>
          <input onBlur={handleName} type="text" name='name' required />
        </div>}
        <br />
        <div className='field'>
          <label htmlFor="email">Email</label>
          <input onBlur={handleEmail} type="text" name='email' required />
        </div>
        <br />
        <div className='field'>
          <label htmlFor="password">Password</label>
          <input onBlur={handlePassword} type="password" name='password' required />
        </div>
        <br />
        <input onChange={toggleCheckBox} type="checkbox" name="Existing User" id="" />
        <label htmlFor="checkbox">Existing User ?</label>
        <button type='submit'>{isLogIn ? "Login" : "Register"} </button>
        <button onClick={handleResetPassword}>Reset Password</button>

      </form>

      <p>{error}</p>

    </div>
  );
}

export default App;
