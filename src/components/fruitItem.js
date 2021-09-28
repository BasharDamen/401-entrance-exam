import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class FruitItem extends Component {
  render() {
    return (
      <div>
        <Col>
          {" "}
          <Card>
            <Card.Img variant="top" src={this.props.item.image} />
            <Card.Body>
              <Card.Title>{this.props.item.name}</Card.Title>
              <Card.Text>{this.props.item.price} </Card.Text>
              <Button
                variant="success"
                onClick={() => {
                  this.props.addToFav(this.props.item);
                }}
              >
                Add to Favorite
              </Button>{" "}
            </Card.Body>
          </Card>
        </Col>
      </div>
    );
  }
}

export default FruitItem;
