import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
class FavItems extends Component {
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
                  this.props.display(this.props.item);
                }}
              >
                Update
              </Button>{" "}
              <Button
                variant="danger"
                onClick={() => {
                  this.props.delete(this.props.item._id);
                }}
              >
                Delete
              </Button>{" "}
            </Card.Body>
          </Card>
        </Col>
      </div>
    );
  }
}

export default FavItems;
