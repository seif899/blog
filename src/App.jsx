import { MantineProvider } from '@mantine/core';
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup';
import { useState } from 'react';
import Home from './Components/Home/Home';


export default function App() {
  const [isSignIn,setIsSignIn] = useState(false);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [userData,setUserData] = useState({});

  return (
    
    
    <MantineProvider withGlobalStyles withNormalizeCSS>
      
      {
        isLoggedIn ? 
          <Home userData={userData} setUserData={setUserData}/>  
        : isSignIn ?  
          <Signin setIsSignIn={setIsSignIn} setIsLoggedIn={setIsLoggedIn} setUserData={setUserData} />
        : <Signup  setIsSignIn={setIsSignIn} setIsLoggedIn={setIsLoggedIn} setUserData={setUserData}/> 
      }
          
          

    </MantineProvider>
  );
}