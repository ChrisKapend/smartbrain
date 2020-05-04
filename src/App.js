import React, { Component } from 'react';
import Navigation from './component/Navigation';
import Logo from './component/Logo';
import ImageLinkForm from './component/ImageLinkForm';
import Rank from './component/Rank';
import Particles from 'react-particles-js';
import './App.css';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey:'938d80760f2a459994bf563ad7a916bf'
})


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

class App extends Component{
  constructor(){
    super();
    this.state = {
      input:''
    }
  }
  onInputChange = (event) =>{
    console.log(event.target.value)
  }
  onButtonSubmit = () =>{
    console.log('click')
    app.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
      .then(generalModel => {
        return generalModel.predict("@@sampleTrain");
      })
      .then(response => {
        var concepts = response['outputs'][0]['data']['concepts']
      })
  }
  render(){
    return(
      <div className="App">
        <Particles className='particles'params={particlesOptions}/>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
      </div>
    )
  }
}

export default App;
