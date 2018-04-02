import React from 'react';
import EventsListItems from './list_item';


const ListOfEvents = (props) => {
    const list = props.eventsList.map((item, index) => {
        return (
            <EventsListItems item={item} key={index}/>
        )
    })

    return(
        <div>
            <ul className="list-group">
                {list}
            </ul>
        </div>
    )
}
export default ListOfEvents;