import React from 'react'
import {signOut} from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {onAuthStateChanged } from "firebase/auth";
import {addUser,  removeUser } from "../utils/userSlice"
import { useEffect } from 'react';
import { LOGO } from '../utils/constants';

const Header = () => {

  const dispatch = useDispatch();

  const user = useSelector(store => store.user);
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

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
        
        <img className='w-44' src={LOGO}></img>


   { user && (<div className='flex gap-2 items-center'>
      <img className='w-14' src = {user?.photoURL} alt='ProfileLogo'></img>

      <button onClick={handleSignOut} className='font-bold text-white px-2 bg-red-600 rounded-lg h-8 cursor-pointer'>(Sign Out)</button>
    </div>)
}

    </div>
  )
}

export default Header
