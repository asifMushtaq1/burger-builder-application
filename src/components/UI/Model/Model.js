import React,{ Component} from 'react'

import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxillary/Auxillary';

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState){
    return nextProps.showOrderSummary !== this.props.showOrderSummary  || nextProps.children !== this.props.children;
     }

     componentDidUpdate(){
       console.log('[Model ---Component Did Update]')
     }
   render(){
     return(
      <Aux>
   
      <Backdrop showOrderSummary= {this.props.showOrderSummary} 
            removeBackdrop= {this.props.removeBackdrop}/>
       <div className = {classes.Modal}
         style = {{
           transform: this.props.showOrderSummary?'translateY(0)' : 'translateY(-100vh)' , 
           opacity : this.props.showOrderSummary? '1' : '0'
        }}
      >
      {this.props.children}
    </div>
    </Aux>
     )
   }
}
export default Modal;