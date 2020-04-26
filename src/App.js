import React from 'react';
import Navigation from './component/Navigation';
import Logo from './component/Logo';
import ImageLinkForm from './component/ImageLinkForm';
import Rank from './component/Rank';
import Particles from 'react-particles-js';
import './App.css';

function App() {
  const particlesOptions={
    particles: {
      number:{
        value:200,
        density:{
          enable:true,
          value_area:800
        }
      }
    },
    interactivity:{
      detect:'on',
      events:{
        onhover:{
          enable:'true',
          mode:'repulse'
        }
      }
    }
  }
  return (
    <div className="App">
      <Particles className='particles'
             params={particlesOptions}/>
          <Navigation />
          <Logo />
          <Rank />
          <ImageLinkForm />
    </div>
  );
}

export default App;
