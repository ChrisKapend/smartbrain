import React from 'react';
import './SignIn.css';
class SignIn extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            signInEmail:'',
            signInPassword:''
        }
    }
    onEmailCChange =(event) =>{
        this.setState({signInEmail:event.target.value})
    }
    onPasswordChange =(event) =>{
        this.setState({signInPassword:event.target.value})
    }
    //calling the server api for signing in, if we the answer is an error return to home
    onSubmitSignIn = () =>{
        fetch('http://localhost:4000/signin', {
            method:'post',
            headers:{'content-Type':'application/json'},
            body:JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(data =>{
                if(data != 'error') {
                    this.props.loadUser(data);
                    this.props.onRouteChange('home');
                }
                else{
                    document.getElementById('errorMessage').classList.remove('error');
                }
            })
    }
    render(){
        const {onRouteChange} = this.props
        return(
            <article className='mainContainer shadow-5 br4'>
                <main className='pa4 black-80 center'>
                    <section className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    required={'required'}
                                    className="inputField pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email"
                                    onChange={this.onEmailCChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    required={'required'}
                                    className="inputField b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
                            <p id={'errorMessage'} className={'error'}>username or password incorrect !</p>
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() =>{onRouteChange('register')}} href="#0" className="f6 link dim black db">Register</p>
                        </div>
                    </section>
                </main>
            </article>
        )
    }
}
export default SignIn;