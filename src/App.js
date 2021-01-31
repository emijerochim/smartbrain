import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 600
      }
    }
  }
}
const app = new Clarifai.App({
  apiKey: "0fb9821aab5a47d78232829660de0db5",
});

class App extends Component{
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signIn',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  displayFaceBox = (box) => {
    this.setState({box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  };
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input
    )
    .then((response) => {
      this.displayFaceBox(this.calculateFaceLocation(response));
    })
    .catch((err) => {
      console.log(err);
    });
  };

  onRouteChange = (route) => {
    if(route==='signIn') {
      this.setState({isSignedIn: false});
    }
    else if(route==='home'){
      this.setState({isSignedIn: true})
    }

    this.setState({route});
  }

  render() {
    const {isSignedIn, imageUrl, route, box} = this.state;

    return(
      <div className="App">
        <Particles params={particlesOptions} className='particles'/>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        
        {route === 'home' ? 
          <>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </> :
          (route==='signIn' ?
            <SignIn onRouteChange={this.onRouteChange}/> :
            <Register onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    )
  }
}

export default App;
