import React from 'react';
import GroupPic from './imgs/group_pic.png';
import './app.css';


const AboutUs = () => {
    return(
        <div>
            <h1 className="aboutUs_title">About Us</h1> 
            <div className="group_pic">
                <img src={GroupPic} />
            </div>
            <div className="aboutUs_inner_text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                Voluptas odit at qui tempora, odio dolorem iste quis earum 
                perferendis, distinctio officiis, enim fuga accusantium 
                vitae quae tempore, ipsum sunt veritatis ducimus quidem 
                repellendus modi. Architecto delectus, numquam eum? Veritatis 
                deserunt molestias quae accusamus, rerum, sequi. Quia laborum, 
                nihil iure in, cum alias saepe ducimus quo similique est sit 
                soluta, rerum. 
            </div>
        </div>
    )
}

export default AboutUs;