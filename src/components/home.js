import React, {Component} from 'react';
import CreateEventForm from './create_event_form';
import Modal from 'react-modal';
import Maps from './map_component';
import {connect} from 'react-redux';
import _ from 'lodash';

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

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    render(){

        let markers_array = [{lat: this.props.position.lat,
        lng: this.props.position.lng,
        type: 'userLocation'}];
        if(!_.isEmpty(this.props.events.createdEvents)){
            this.props.events.createdEvents.map((eventInfo)=>{
                markers_array.push({
                    lat: eventInfo.latitude,
                    lng: eventInfo.longitude,
                    type: "myEvents"
                });
            })
        }
        if(!_.isEmpty(this.props.events.invitedEvents)){
            this.props.events.invitedEvents.map((eventInfo)=>{
                markers_array.push({
                    lat: eventInfo.latitude,
                    lng: eventInfo.longitude,
                    type: "invitedEvents"
                });
            })
        }

        let PermissionMsg = "";

        if(this.props.position.showPermissionMsg){
            PermissionMsg = "Enable Geolocation for accurate results";
        }


        return(
            <div>
                <Maps
                    center={this.props.position}
                    // position = {this.props.position}
                    containerElement={<div className='map_element' style={{ height: `82vh` , width: `100vw`, position: `relative`}} />}
                    mapElement={<div style={{ height: `82vh` , width: `100vw`}} />}
                    markers={markers_array} 
                    />

                <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} contentLabel="Event Modal">
                    <CreateEventForm exitEventForm={(event)=>this.closeModal(event)} />
                </Modal>

                <button className="btn btn-default btn-circle create_event_button" onClick={this.openModal} >Create Event!</button>
                <div>{PermissionMsg}</div>
            </div>
        )
    }
}
function mapStateToProps(state){
    return {position: state.userLocation, events:state.userInfo.events};
}

export default connect(mapStateToProps)(Home);