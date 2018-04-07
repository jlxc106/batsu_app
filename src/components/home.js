import React, {Component} from 'react';
import CreateEventForm from './create_event_form';
import Modal from 'react-modal';
import Maps from './map_component';
import {connect} from 'react-redux';

class Home extends Component {
    constructor(props){
        super(props);

        this.state = {
            modalIsOpen: false,
            position: {}
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    // componentWillMount(){

    // }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    render(){
        // console.log(this.props);
        return(
            <div>
                <Maps
                    center={this.props.position}
                    // position = {this.props.position}
                    containerElement={<div className='map_element' style={{ height: `82vh` , width: `100vw`, position: `relative`}} />}
                    mapElement={<div style={{ height: `82vh` , width: `100vw`}} />}
                    markers={[{
                        position: this.props.position,
                    }]} 
                    />

                <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} contentLabel="Event Modal">
                    <CreateEventForm exitEventForm={(event)=>this.closeModal(event)} />
                </Modal>

                <button className="btn btn-default btn-circle create_event_button" onClick={this.openModal} >Create Event!</button>
            </div>
        )
    }
}
function mapStateToProps(state){
    // console.log("state: ",state);
    return {position: state.userLocation};
}

export default connect(mapStateToProps)(Home);