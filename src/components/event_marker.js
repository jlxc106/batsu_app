import React ,{ Component } from 'react' ;
import { withGoogleMap, GoogleMap, Marker, Circle} from "react-google-maps";


class Maps extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const image = {
            url: 'https://cdn1.iconfinder.com/data/icons/pretty-office-part-13-simple-style/512/user-green.png',
            scaledSize: new google.maps.Size(52, 53)
        };

        if(!this.props.position.lat){
            return <h4>LOADING...</h4>
        }
        return(
            <GoogleMap
                defaultZoom={16}
                defaultCenter={this.props.position}>
                

                {this.props.markers.map((marker, index)=>{
                    if(index === 0){
                        return(
                            <Marker
                            key={index}
                            position={marker}/>
                        )
                    }
                    return(
                        <Marker
                        key={index}
                        position={marker}
                        icon={image}/>
                    )
                })}

                <Circle
                    center={this.props.position}
                    radius={this.props.radius}
                    options={{
                        fillColor: `blue`,
                        fillOpacity: 0.20,
                        strokeColor: `orange`,
                        strokeOpacity: 1,
                        strokeWeight: 1,
                    }} />
            </GoogleMap>
        )
    }
}

export default withGoogleMap(Maps) 