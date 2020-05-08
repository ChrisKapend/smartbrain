import React, { Component } from 'react';
import Navigation from './component/Navigation';
import Logo from './component/Logo';
import ImageLinkForm from './component/ImageLinkForm';
import Rank from './component/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './component/FaceRecognition';
import SignIn from'./component/SignIn';
import Register from "./component/Register";
import './App.css';
import Clarifai from 'clarifai';


//particules background

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

// state variables definitions
class App extends Component{
  constructor(){
    super();
    this.state = {
      input:'',
      imageUrl:'',
      box:{},
      route:'signin',
      isSignedIn:false
    }
  }
  //action taken when a user click on navigations links
  onRouteChange = (route) =>{
    if (route === 'signout')
      this.setState({isSignedIn:false})
    else if (route ==='home')
      this.setState({isSignedIn:true})
    this.setState({route:route});
  }
  // when the input search bar receive an change
  onInputChange = (event) =>{
    this.setState({input:event.target.value});
  }
  //locating the face on the picture
  faceLocation=(data)=>{
    const face = data.region_info.bounding_box;
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
// drawing the face 
  drawFace = (box) =>{
    this.setState({box:box});
  }
  //action when the submit button is click call to the api for face detection
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
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
        {
          this.state.route === 'home'
          ? <div>
                <Logo />
                <Rank />
                <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
                <FaceRecognition imageUrl = {this.state.imageUrl} box = {this.state.box}/>
              </div>
          : (
              this.state.route === 'signin'
              ? <SignIn onRouteChange= { this.onRouteChange } />
              : <Register onRouteChange={ this.onRouteChange }/>
              )
        }
      </div>
    )
  }
}

export default App;
