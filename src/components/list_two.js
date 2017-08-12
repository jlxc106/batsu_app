import React from 'react';


const ListTwo = (props) => {

    const list = props.invitedEventsList.map((item, index) => {
        return (
            <li className="list-group-item" key={index}>
                <span className="col-2">{item.title}</span>
            </li>
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
export default ListTwo;