import React ,{ Component } from 'react' ;
import { withGoogleMap, GoogleMap, Marker, Circle} from "react-google-maps";

class Maps extends Component {
    constructor(props){
        super(props);
        this.state = {
            position: {}
        };

        this.getUserPermision = this.getUserPermision.bind(this);

    }

    componentWillMount() {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getUserPermision);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }


    getUserPermision(position) {
        console.log("Latitude: " + position.coords.latitude +
            " Longitude: " + position.coords.longitude);
        this.setState({position:{
            lat:position.coords.latitude,
            lng:position.coords.longitude
        }});

    }




    render(){
        const image = {
            url: './imgs/person3.ico',
            scaledSize: new google.maps.Size(52, 53)
        };
        const markers = this.props.markers[0].position || []
        const radius = this.props.radius || {}
        console.log(this.props.markers[0].position);
        console.log("State in render:", this.state.position);


        const { lat, lng } = this.state.position;

        console.log('lat:', lat, 'lng:', lng);

        if (!lat){
            console.log("This is the current directory", __dirname);
            return     <img id="loading" src="http://blog.teamtreehouse.com/wp-content/uploads/2015/05/InternetSlowdown_Day.gif" alt=""/>
        }
        return(
            <GoogleMap
                defaultZoom={15}
                defaultCenter={{lat, lng}}
            >
                <Marker
                    position={{lat, lng}}
                    icon={image}
                />



            </GoogleMap>

        )

    }
}

export default withGoogleMap(Maps)