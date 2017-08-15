import React from 'react';
import axios from 'axios';
import Event from './events';
import Modal from 'react-modal';
import Maps  from './map_component';


class Map extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            modalIsOpen: false,
            position:{}
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

        return(
            <div>

                      <Maps 
                center={{lat:33.6904288, lng:-117.8330699}}
                containerElement={<div className='hi' style={{ height: `82vh` , width: `100vw`}} />}
                mapElement={<div style={{ height: `82vh` , width: `100vw`}} />}
                markers={[{
                    position: {
                        lat:33.6904288,
                        lng:-117.8330699
                      },
                
                         }]}
                      />
                
                <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}  contentLabel="Event Modal">
                    <Event onCancel={(e)=>this.closeModal(e)} />
                </Modal>
                <button className="btn btn-default btn-circle" onClick={this.openModal}>+</button>
            </div>
        )
    }
}

export default Map;