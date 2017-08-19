import React from 'react';
import { Link } from 'react-router-dom';


const EventsListItems = (props) => {
    const {item} = props;
    const id = props.item.event_id;
<<<<<<< HEAD
    console.log(id);
=======

>>>>>>> d48294654d40a0fd4f7ed9ce3f6eaa987e3d4542
    return (
        <li onClick={() => {console.log(props.item.event_id)}} className="list-group-item">
            <Link to={`/preview_event/${id}`}>
                <span className="col-2">{item.event_name}</span>
                <span className="col-2">{item.creator_id}</span>
                <span className="col-2">{item.event_dateTime}</span>
            </Link>
        </li>
    )
}
export default EventsListItems;