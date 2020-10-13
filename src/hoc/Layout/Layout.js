import React,{Component} from 'react';

import Aux from '../Auxillary/Auxillary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux'

class Layout extends Component {
  state = {
    showSideDrawer : false
  }
  closedSideDrawerHandler = () => {
    this.setState({showSideDrawer : false})
  }
   
  ToogleSideDrawerHandler = () => {
             this.setState( (prevState) => {
             return {showSideDrawer : !prevState.showSideDrawer};
  });
}

  render(){
    return(
      <Aux>
         <Toolbar isAuth = {this.props.isAuthenticated} 
                  ToogleSideDrawer = {this.ToogleSideDrawerHandler}/>
         <SideDrawer
            open = {this.state.showSideDrawer} 
            closed ={this.closedSideDrawerHandler}
            isAuth = {this.props.isAuthenticated}/>
       <main className = {classes.Content}>
        {this.props.children}
       </main>
    </Aux>
    )
  }
}

const mapStateToProps = state => {
     return {
       isAuthenticated : state.auth.token !== null
     }
}
export default connect(mapStateToProps)(Layout);