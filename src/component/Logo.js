import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png'
const Logo = () =>{
    return(
        <article className='ma4 mt0'>
            <Tilt className="Tilt br0 shadow-4" options={{ max : 100 }} style={{ height: 150, width: 150}} >
                <div className="Tilt-inner pa3"> <img src={brain} alt='logo' style={{paddingTop:'5px', width:'100px'}}/>  </div>
            </Tilt>
        </article>
    )
}
export default Logo;