import React from 'react';

export default props => {
    const profilePic = props.list.map((item, index) =>{
        return(
            <img key={index} src={require(`../../upload_images${item.eventinvitees[0].path}`)}/>
        )
    })

    return(
        <div>
            {profilePic}
        </div>
    )
}