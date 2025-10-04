import React, { useState } from 'react'
import Header from './Header'

const Login = () => {

const[isSignInForm, setIsSignInForm] = useState(true);

const handleSignInForm = ()=>{
    setIsSignInForm(!isSignInForm);
}

  return (
    <div>
        <Header/>
        <div className='absolute'>
            <img src='https://assets.nflxext.com/ffe/siteui/vlv3/d482944d-eab4-4a64-89c9-a07a508a6e42/web/IN-en-20250929-TRIFECTA-perspective_4cf0c8a1-bd35-4d72-a49f-165021531dde_large.jpg' alt='background img'></img>
        </div>

    <form className='absolute p-12 bg-black/80 w-4/12 mx-auto right-0 left-0 my-24 text-white bg-opacity-80'>

    <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>

{!isSignInForm && <input type='text' placeholder='Full Name' className='p-4 my-4 bg-gray-700 text-black w-full'/>}

        <input type='text' placeholder='Email address' className='p-4 my-4 bg-gray-700 text-black w-full'/>
        <input type='password' placeholder='Password' className='p-4 my-4 bg-gray-700 text-black w-full'/>
        <button className='p-3 my-6 bg-red-700 w-full cursor-pointer'>{isSignInForm ? "Sign In" : "Sign Up"}</button>

        <p className='py-4 cursor-pointer' onClick={handleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now." : "Already Registered? Sign In Now."}</p>
    </form>

    </div>
  )
}

export default Login;
