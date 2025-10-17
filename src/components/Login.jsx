import React, { useRef, useState } from 'react'
import Header from './Header'
import { CheckValidData } from '../utils/Validate';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../utils/firebase"
// import { useNavigate } from 'react-router-dom';
import { updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_URL, USER_AVATAR } from '../utils/constants';



const Login = () => {

const[isSignInForm, setIsSignInForm] = useState(true);
const [errorMessage, setErrorMessage] = useState(null);
const dispatch = useDispatch();

// const navigate = useNavigate();

const email = useRef(null);
const password = useRef(null);
const name = useRef(null);


const handleClickButton = ()=>{

const message = CheckValidData(email.current.value, password.current.value);
// console.log(message);

// console.log(message);
setErrorMessage(message);
// console.log(email.current.value);
// console.log(password.current.value);
if(message) return;


// Sign In Sign Up Logic

if(!isSignInForm){
// SignUp logic
createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;

    updateProfile(user, {
  displayName: name.current.value, photoURL: USER_AVATAR
}).then(() => {
  // Profile updated!
   const {uid, email, displayName, photoURL} = auth.currentUser;
     dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}))
  
  // navigate("/browse");
  
}).catch((error) => {
  // An error occurred
  // ...
  setErrorMessage(error.message);
})

    // console.log(user);

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  setErrorMessage(errorCode+"-"+errorMessage);
  });
}

else{
// SignIn logic
signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // console.log(user);
    // navigate("/browse");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+"-"+errorMessage);
  });
}

}

const handleSignInForm = ()=>{
    setIsSignInForm(!isSignInForm);
}

  return (
    <div>
        <Header/>
        <div className='absolute'>
            <img src={BG_URL} alt='background img'></img>
        </div>

    <form onSubmit={(e) => e.preventDefault()} className='absolute p-12 bg-black/80 w-4/12 mx-auto right-0 left-0 my-24 text-white bg-opacity-80'>

    <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>

{!isSignInForm && <input ref={name} type='text' placeholder='Full Name' className='p-4 my-4 bg-gray-700 text-black w-full'/>}

        <input ref={email} type='text' placeholder='Email address' className='p-4 my-4 bg-gray-700 text-black w-full'/>
        <input ref={password} type='password' placeholder='Password' className='p-4 my-4 bg-gray-700 text-black w-full'/>

      <p className='px-4 font-bold text-red-700'>{errorMessage}</p>

        <button onClick={handleClickButton}  className='p-3 my-6 bg-red-700 w-full cursor-pointer'>{isSignInForm ? "Sign In" : "Sign Up"}</button>

        <p className='py-4 cursor-pointer' onClick={handleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now." : "Already Registered? Sign In Now."}</p>
    </form>

    </div>
  )
}

export default Login;
