import React, { Component } from 'react';

class ToyForm extends Component {

  state = {
    name: '',
    image: ''
  }


  submit = (e) => {
    e.preventDefault()
    this.props.submitHandler({name: this.state.name, image: this.state.image, likes: 0})
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={this.submit}>
          <h3>Create a toy!</h3>
          <input type="text" name="name" placeholder="Enter a toy's name..." className="input-text" onChange={this.changeHandler} value={this.state.name}/>
          <br/>
          <input type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text" onChange={this.changeHandler} value={this.state.image}/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
