import React from 'react';
import './Navigation.css';
//navigation behavior when a user click on the navigation links
const Navigation = ({onRouteChange, isSignedIn}) =>{
    console.log(isSignedIn);
    if(isSignedIn){
        return(
            <nav style={{display:'flex', justifyContent:'flex-end'}}>
                <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign out</p>
            </nav>
            )
    }
    else{
        return(
            <nav style={{display:'flex', justifyContent:'flex-end'}}>
                <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
                <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
            </nav>
            )
    }
}
export default Navigation;