import React, { Component } from 'react';

class Profile extends Component{
    componentWillMount(){

    }

    handleEdit(id){

    }
    render(){
        return(
            <div className="container">
                <h1>Profile</h1>
                <div className="profile_pic">

                </div>
                <div className="container">
                    <div className="fname">
                        {}
                    </div>
                    <div className="lname">
                        {}
                    </div>
                    <div className="email">
                        {}
                    </div>
                    <div className="phone">
                        {}
                    </div>
                    <div className="bio">
                        {}
                    </div>
                </div>
                <div className="row">
                    <button className="edit btn btn-info">Edit</button>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state){
    return{

    }
}
export default connect(mapStateToProps, {getTodos, deleteTodo})();