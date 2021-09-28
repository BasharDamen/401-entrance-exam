import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import FavItems from "./FavItems";
import Row from "react-bootstrap/Row";
import UpdateForm from "./UpdateForm";
class FavFruit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myFavItemsArr: [],
      showForm: false,
      name: "",
      photo: "",
      price: "",
      id: "",
    };
  }

  componentDidMount = () => {
    const { user } = this.props.auth0;
    const email = user.email;

    axios
      .get(`https://fruits-server.herokuapp.com/favItems?email=${email}`)
      .then((result) => {
        this.setState({
          myFavItemsArr: result.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**=============== Update ============== */

  handleDisplay = (item) => {
    this.setState({
      showForm: true,
      name: item.name,
      price: item.price,
      id: item._id,
    });
  };

  handleClose = () => {
    this.setState({
      showForm: false,
    });
  };

  updateData = (event) => {
    event.preventDefault();

    const { user } = this.props.auth0;
    const email = user.email;

    const obj = {
      name: event.target.ItemName.value,
      price: event.target.itemPrice.value,
      email: email,
    };

    axios
      .put(`https://fruits-server.herokuapp.com/updateInfo/${this.state.id}`, obj)
      .then((result) => {
        this.setState({
          myFavItemsArr: result.data,
          showForm: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteItem = (id) => {
    const { user } = this.props.auth0;
    const email = user.email;

    axios
      .delete(`https://fruits-server.herokuapp.com/deleteItem/${id}?email=${email}`)
      .then((result) => {
        this.setState({
          myFavItemsArr: result.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <>
        <h1>My Favorite Fruits</h1>
        <Row xs={1} md={4} className="g-4">
          {this.state.myFavItemsArr.map((item) => {
            return (
              <FavItems
                item={item}
                display={this.handleDisplay}
                delete={this.deleteItem}
              />
            );
          })}
        </Row>
        <UpdateForm
          updateData={this.updateData}
          handleClose={this.handleClose}
          show={this.state.showForm}
          handleClose={this.handleClose}
          name={this.state.name}
          price={this.state.price}
        />
      </>
    );
  }
}

export default withAuth0(FavFruit);
