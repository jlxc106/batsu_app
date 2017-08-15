import React, {Component} from 'react';
import './app.css';
import axios from 'axios';


class LogInForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            form: {
                email: '',
                password: ''
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
        axios.post(`http://localhost:8888/form.php?operation=insertUser`, form).then((resp) => {
            console.log('this is the response: ', resp);
        })
    }
    
    render(){
        const {email, password} = this.state.form;
        return(
            <div className="login_page">
                <form onSubmit={(event) => {this.handleFormSubmit(event)}}>
                    <div>
                        <h6 className="login-subtitles">E-mail</h6>
                        <input name="email" placeholder="E-mail" type="email" value={email} onChange={ (event) => this.handleChange(event) } />
                    </div>
                    <div>
                        <h6 className="login-subtitles">Password</h6>
                        <input name="password" placeholder="Password" type="password" value={password} onChange={ (event) => this.handleChange(event) } />
                    </div>
                    <button type="submit" className="login-button">Log In</button>
                </form>
            </div>
        )
    }
}

export default LogInForm;
