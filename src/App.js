import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

import data from './data'


class App extends React.Component{

  state = {
    display: false,
    toys: []
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  componentDidMount(){
    fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(data => {
      this.setState({
        toys: data
      })
    })
  }

  submitHandler = (toyObj) => {
    console.log(toyObj)
    fetch('http://localhost:3000/toys',{
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
      accepts: 'application/json'
    },
    body: JSON.stringify(toyObj)
  }).then(response => response.json())
  .then(newObj => {
    let newArray = [newObj, ...this.state.toys]
    this.setState({
      toys: newArray
    })
  })
  }

  deleteHandler = (toyObj) => {
    fetch(`http://localhost:3000/toys/${toyObj.id}`, {method: 'DELETE'})
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if(data.id === undefined) {
        let newArray = this.state.toys.filter(toy => toy.id !== toyObj.id)
        console.log(newArray)
        this.setState({
          toys: newArray
        })
      }

    })
  }

  likeHandler = (toyObj) => {
    fetch(`http://localhost:3000/toys/${toyObj.id}`, {
      method: 'PATCH',

      headers: {
        'Content-Type': 'application/json',
        accepts: 'application/json'
      },
      body: JSON.stringify({
        likes: toyObj.likes + 1 
      })
    }).then(response => response.json())
    .then(updatedToy => {
      let newArray = [...this.state.toys]
      let found = newArray.find(toy => updatedToy.id == toy.id)
      found.likes = updatedToy.likes
      this.setState({
        toys: newArray
      })
    })
    
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm submitHandler={this.submitHandler}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} deleteHandler={this.deleteHandler} likeHandler={this.likeHandler}/>
      </>
    );
  }

}

export default App;
