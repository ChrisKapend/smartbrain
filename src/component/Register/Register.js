import React from 'react';
import './Register.css';
class Register extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            registeredEmail: '',
            registerPassword: '',
            registeredName: ''
        }
    }
    onEmailChange  = event =>{
        this.setState({registeredEmail:event.target.value})
    }
    onNameChange = (event) =>{
        this.setState({registeredName:event.target.value})
    }
    onPasswordChange = event =>{
        this.setState({registeredPassword:event.target.value})
    }
    onSubmitRegister = (props) => {
        fetch('http://localhost:4000/register', {
            method:'post',
            headers:{'content-type':'application/json'},
            body:JSON.stringify({
                email:this.state.registeredEmail,
                name:this.state.registeredName,
                password:this.state.registeredPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if(user){
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
            })
    }
    render() {
        return(
            <article className='mainContainer shadow-5 br4'>
                <main className='pa4 black-80 center'>
                    <section className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                                <input
                                    className="inputField pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={this.onNameChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    className="inputField pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email"
                                    onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    className="inputField b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input onClick={this.onSubmitRegister} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
                        </div>
                    </section>
                </main>
            </article>
        )
    }
}
export default Register;