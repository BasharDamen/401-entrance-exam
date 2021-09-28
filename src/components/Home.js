import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FruitItem from './fruitItem';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
class Home extends React.Component {

  constructor(props){
    super(props);
    this.state={
      fruitsArr : []
    }
  }

  componentDidMount(){
    axios
    .get('https://fruits-server.herokuapp.com/')
    .then(result=>{
      this.setState({
        fruitsArr: result.data
      })
    })
    .catch(err=>{
      console.log(err);
    })
  }


  addToFav=(item)=>{
    const {user}=this.props.auth0;
    const email = user.email

    const obj = {
      name : item.name,
      price : item.price,
      image : item.image,
      email:email,
    }

    console.log(obj);

    axios
    .post('https://fruits-server.herokuapp.com/addToFav', obj)
    .then(result=>{
      this.setState({
        favItemsArr : result
      })
    })
    .catch(err=>{
      console.log(err);
    })

  }

  render() {
    return (
      <>
        <h1>API Fruits</h1>
        {/* <Row xs={1} md={3} className="g-4">
          {this.state.fruitsArr.map((item, idx) => (
            <Col>
              <FruitItem 
              item={item}
              />
            </Col>
          ))}
        </Row> */}

        <Row xs={1} md={4} className="g-4">
          {this.state.fruitsArr.map(item=>(
             <FruitItem item={item} addToFav={this.addToFav}/>
          ))}
        </Row>
      </>
    )
  }
}

export default withAuth0(Home);
