import React from 'react'
import {signOut} from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {onAuthStateChanged } from "firebase/auth";
import {addUser,  removeUser } from "../utils/userSlice"
import { useEffect } from 'react';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {


  const dispatch = useDispatch();

  const user = useSelector(store => store.user);
  const showGptSearch = useSelector(store => store.gpt.showGptSearch);
  const navigate = useNavigate();


  const handleSignOut = ()=>{
    signOut(auth).then(() => {
  // navigate("/");
}).catch((error) => {
  // An error happened.
  navigate("/error");
});
  }

      useEffect(()=>{

   const unsubscribe = onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const {uid, email, displayName, photoURL} = user;
   dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}))

   navigate("/browse");
  }
  
  else {
    // User is signed out
    // ...
    dispatch(removeUser());
    navigate("/");
  }
});

// Unscribe when Component unmounts
return ()=> unsubscribe();

 },[]);

 const handleGptSearchClick = ()=>{
  dispatch(toggleGptSearchView());
 }


 const handlelangOptions = (e)=>{
  dispatch(changeLanguage(e.target.value));
// console.log(e.target.value);
 }

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
        
        <img className='-ml-5 md:-ml-0 w-30 md:w-44' src={LOGO}></img>


   { user && (<div className='flex gap-2 items-center'>

{
    showGptSearch && (

  <select className='bg-black text-white text-sm md:text-lg px-1 md:px-2.5 py-1 md:py-2 rounded-lg' onChange={handlelangOptions}>
    {SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
    
</select>
    )
    
}

    {/* <option value="en">English</option>
    <option value="hindi">Hindi</option>
    <option value="spanish">Spanish</option> */}

    <button className='text-sm bg-purple-800 px-2.5 py-1 rounded-lg text-white cursor-pointer' onClick={handleGptSearchClick}>{showGptSearch ? "Home Page" : "GPT Search"}</button>

      <img className='hidden md:block w-14' src = {user?.photoURL} alt='ProfileLogo'></img>

      <button onClick={handleSignOut} className='font-bold text-white text-sm md:text-lg px-0.5 md:px-2 bg-red-600 rounded-lg md:h-8 py-1 cursor-pointer'>(Sign Out)</button>
    </div>)
}

    </div>
  )
}

export default Header
