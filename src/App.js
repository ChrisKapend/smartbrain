import React, { Component } from 'react';
import Navigation from './component/Navigation';
import Logo from './component/Logo';
import ImageLinkForm from './component/ImageLinkForm';
import Rank from './component/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './component/FaceRecognition'
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
      imageUrl:'',
      box:[]
    }
  }
  onInputChange = (event) =>{
    this.setState({input:event.target.value});
    console.log(event.target.value);
  }
  faceLocation=(data)=>{
    const face = data.region_info.bounding_box;
    console.log(face)
    const image = document.getElementById('srcImage');
    const box ={
      width:Number(image.width),
      height:Number(image.height)
    }
    const{width,height} = box;
    const faceArea = {
      leftCol: face.left_col*width,
      topRow: face.top_row*height,
      rightCol:width - (face.right_col*width),
      bottomRow:height - (face.bottom_row * height)
    }
    return(faceArea)
  }

  drawFace = (box) =>{
    this.setState({box:box});
  }

  onButtonSubmit = () =>{
    this.setState({imageUrl:this.state.input})
    const app = new Clarifai.App({
      apiKey: '938d80760f2a459994bf563ad7a916bf'
     });
     app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.imageUrl)
     .then(response=>{
       response.rawData.outputs[0].data.regions.forEach(element => {
         this.drawFace(this.faceLocation(element));
       });
     })
     .then({
     })
     .catch(err=>{
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
        <FaceRecognition imageUrl = {this.state.imageUrl} box = {this.state.box}/>
      </div>
    )
  }
}

export default App;
