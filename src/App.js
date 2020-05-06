import React, { Component } from 'react';
import Navigation from './component/Navigation';
import Logo from './component/Logo';
import ImageLinkForm from './component/ImageLinkForm';
import Rank from './component/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './component/Facerecognition'
import './App.css';
import Clarifai from 'clarifai';



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
      input:'',
      imageUrl:''
    }
  }
  onInputChange = (event) =>{
    this.setState({input:event.target.value});
    console.log(event.target.value);
  }
  onButtonSubmit = () =>{
    this.setState({imageUrl:this.state.input})
    console.log(this.state.imageUrl)
    const app = new Clarifai.App({
      apiKey: '938d80760f2a459994bf563ad7a916bf'
     });
     app.models.predict(Clarifai.COLOR_MODEL, this.state.imageUrl)
     .then(response=>{
       console.log(response);
     }).catch(err=>{
       console.log(err);
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
        <FaceRecognition imageUrl = {this.state.imageUrl}/>
      </div>
    )
  }
}

export default App;
