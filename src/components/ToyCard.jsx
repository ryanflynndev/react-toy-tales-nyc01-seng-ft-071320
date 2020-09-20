import React, { Component } from 'react';

class ToyCard extends Component {

  delete = (e) => {
    this.props.deleteHandler(this.props.toy)
  }

  like = (e) => {
    this.props.likeHandler(this.props.toy)
  }

  render() {
    return (
      <div className="card">
        <h2>{this.props.toy.name}</h2>
        <img src={this.props.toy.image} alt={this.props.toy.name} className="toy-avatar" />
        <p>{this.props.toy.likes} Likes </p>
        <button onClick={this.like}className="like-btn">Like {'<3'}</button>
        <button onClick={this.delete} className="del-btn">Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
