import React from 'react'
import Profile from './Profile'
import Auth from './Auth'
import { useSelector } from 'react-redux';
import Admin from '../Admin';

function Home() {
  const authId = useSelector((state) => state.authId);


  return (
    <div>
     {authId ? (
          <>
          {authId === 'Vgho33aaJeg0aGq0wM0kHP66MhU2' ?(
            <Admin />
          ):(
            <Profile />
          )}
          </>
        ):(
          <Auth />
      )}
    </div>
  )
}

export default Home