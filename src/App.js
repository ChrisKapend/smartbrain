import React, { Component } from 'react';
import Navigation from './component/Navigation';
import Logo from './component/Logo';
import ImageLinkForm from './component/ImageLinkForm';
import Rank from './component/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './component/FaceRecognition';
import SignIn from './component/SignIn/SignIn';
import Register from "./component/Register/Register";
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
      isSignedIn:false,
      user:{
        id: '',
        name: '',
        email: '',
        joined: '',
        entries: 0
      }
    }
  }
  loadUser = data =>{
    this.setState({
      user:{
        id: data.id,
        name: data.name,
        email: data.email,
        joined: data.joined,
        entries: data.entries
      }
    })
  }
  componentDidMount() {
    fetch('http://localhost:4000')
        .then(response =>response.json())
        .then(console.log)
  }

  //action taken when a user click on navigations links
  onRouteChange = (route) =>{
    console.log(route)
    if (route === 'signin')
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
    console.log(data);
    const face = data.bounding_box;
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
  //.outputs[0].data.regions[0].region_info.bounding_box
  //action when the submit button is click call to the api for face detection
  onButtonSubmit = () =>{
    this.setState({imageUrl:this.state.input})
    const app = new Clarifai.App({
      apiKey: '938d80760f2a459994bf563ad7a916bf'
     });
     app.models
         .predict(Clarifai.FACE_DETECT_MODEL, this.state.imageUrl)
         .then(response=>{
           console.log(response)
           if(response){
             fetch('http://localhost:4000/image',{
               method:'put',
               headers:{'Content-Type':'application/json'},
               body:JSON.stringify({id:this.state.user.id})
             })
                 .then(response => response.json())
                 .then(count => {
                   console.log((`on button ${JSON.stringify(this.state.user)}`));
                   this.setState(Object.assign(this.state.user, {entries: count}));
                   console.log((`after on button ${JSON.stringify(this.state.user)}`));
                 })
           }
           this.drawFace(this.faceLocation(response.outputs[0].data.regions[0].region_info));
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
                <Rank name ={this.state.user.name} entries={this.state.user.entries}/>
                <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
                <FaceRecognition imageUrl = {this.state.imageUrl} box = {this.state.box}/>
              </div>
          : (
              this.state.route === 'signin'
              ? <SignIn loadUser ={this.loadUser} onRouteChange= { this.onRouteChange } />
              : <Register loadUser = {this.loadUser} onRouteChange={ this.onRouteChange }/>
              )
        }
      </div>
    )
  }
}

export default App;
