import React, {Component} from 'react';
import './app.css';
import axios from 'axios';


class LogInForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            form: {
                email: 'usethis@gmail.com',
                password: 'passW0rdhaHAA'
            }
        }
    }

    handleFormSubmit(event){
        event.preventDefault();
        console.log('Called handleFormSubmit', this.state.form);
        const newState = {
            form: {
                email: '',
                password: ''
            }
        }
        this.setState(newState);
        this.handleAxios();
    }

    handleChange(event){
        const { name, value } = event.target;
        const { form } = this.state;
        form[name] = value;
        this.setState({form: {...form}});
    }

    handleAxios(){
        const {form} = this.state;
        axios.post(`http://localhost/c5.17_accountability/form.php?operation=authenticateUser`, form).then((resp) => {

            console.log('this is the response: ', resp);
            if(resp.data.success === true){
                var now = new Date();
                var time = now.getTime();
                var expireTime = time + 86400000;   //24 hours
                now.setTime(expireTime);
                document.cookie = "token="+resp.data.token+";expires="+now.toUTCString()+";path=/";
                //go to home page
            }
            else{
                //stay on log in page
            }
        })
    }
    
    render(){
        const {email, password} = this.state.form;
        return(
            <div className="login_page">
                <form onSubmit={(event) => {this.handleFormSubmit(event)}}>
                    <div>
                        <h6 className="login-subtitles">E-mail</h6>
                        <input name="email" type="email" value={email} onChange={ (event) => this.handleChange(event) } />
                    </div>
                    <div>
                        <h6 className="login-subtitles">Password</h6>
                        <input name="password" type="password" value={password} onChange={ (event) => this.handleChange(event) } />
                    </div>
                    <button type="submit" className="login-button">Log In</button>
                </form>
            </div>
        )
    }
}

export default LogInForm;
