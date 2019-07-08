import React,{Component} from 'react';
import './App.css';


import Unsplash from 'unsplash-js';
const unsplash = new Unsplash({
  applicationId: "57392ca3c38a233594e6ddc8d8c6a3849c0d7f9c8d523d665ae61430c9a2533c",
  secret: "9281730cc5da7366262491b3356700875b67acb61d96d9582f26545fe5a7dfa5"
});


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      name: "",
      temp: null,
      temp_max: null,
      temp_min: null,
      humidity: null,
      description: "",
      winds: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    this.searchWeather(this.state.value);
    event.preventDefault();
  }

  searchWeather(city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&cnt=5&units=metric&APPID=8482040e7b20868592a439ed85bb6933")
       .then(response => {return response.json()})
       .then(data => this.setState({name: data["name"], temp: data["main"]["temp"], temp_max: data["main"]["temp_max"], temp_min: data["main"]["temp_min"], humidity: data["main"]["humidity"], description: data["weather"]["0"]["description"], winds: data["wind"]["speed"]}))
       .catch(error => console.error('Error:', error));
    unsplash.photos.getRandomPhoto({query: city})
       .then(response => {return response.json()})
       .then(data => document.getElementById("bg").style.backgroundImage = "url('" + data["urls"]["raw"] + "')")
      }

  componentDidMount() {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=Paris&cnt=5&units=metric&APPID=8482040e7b20868592a439ed85bb6933")
       .then(response => {return response.json()})
       .then(data => this.setState({name: data["name"], temp: data["main"]["temp"], temp_max: data["main"]["temp_max"], temp_min: data["main"]["temp_min"], humidity: data["main"]["humidity"], description: data["weather"]["0"]["description"], winds: data["wind"]["speed"]}))
       .catch(error => console.error('Error:', error));
       
    unsplash.photos.getRandomPhoto({query: "Paris"})
    .then(response => {return response.json()})
    .then(data => document.getElementById("bg").style.backgroundImage = "url('" + data["urls"]["raw"] + "')")
    .catch(error => console.error('Error:', error));
    //document.body.style.backgroundImage = "url('" + "https://images.unsplash.com/photo-1530622044064-d99fa23c9bf3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjgwNTI5fQ" + "')";
  }


  render() {    

    return (

      <div className="App">
        
        <div className="content">
        <h1>{this.state.name}</h1>
        <br></br>
        <h2>{this.state.temp + " °C"}</h2>
        <h2>{this.state.description}</h2>
        <h5>{"Humidity: " + this.state.humidity}</h5>
        <h5>{"Wind speed: " + this.state.winds}</h5>
        <br>
        </br>
        <form onSubmit={this.handleSubmit}>
        <label className="input-label">Check another city's weather:<input style={{background: "transparent", marginLeft: "30px"}} type="text" value={this.state.value} onChange={this.handleChange}/></label>
        <input type="submit" value="Submit"/>
        </form>
        </div>
        <div id="bg"></div>
      </div>
    );
  }
}

export default App;
