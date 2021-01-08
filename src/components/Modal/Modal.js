import React, { Component } from 'react';
import classes from './Modal.module.css';
import Aux from '../../hoc/ReactAux';
import Backdrop from '../Backdrop/Backdrop'


// IMPORTANT:
// even though this classes doesn't manage state,
// turned this to class based component for OPTIMIZATION -
// to use lifecycle hook "shouldComponentUpdate"
// so the modal is re-rendered only when it's supposed to be shown,
// and not everytime the variables that are related to it in the DOM change.

class Modal extends Component {

// update modal only if the show prop has changed.
shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
}

    render() {
        let modalWindow = null;
        if (this.props.show) {
            modalWindow = (
                <div className={classes.Modal} id="modal">
                    {this.props.children}
                </div>
            );
        }
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                {modalWindow}
            </Aux>
        );
    }
}

export default Modal;