import React from 'react';
import { Link } from 'react-router-dom';


const EventsListItems = (props) => {
    const {item} = props;
    const id = props.item.event_id;

    return (
        <li className="list-group-item">
            <Link to={{pathname: `/preview_event`, state:{id} }}>
                <span className="col-2">{item.event_name}</span>
                <span className="col-2">{item.creator_id}</span>
                <span className="col-2">{item.event_dateTime}</span>
            </Link>
        </li>
    )
}
export default EventsListItems;