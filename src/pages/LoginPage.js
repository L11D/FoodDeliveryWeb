import React from "react";
import {login} from "../Requests";
import {Link} from "react-router-dom";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleDataChange = this.handleDataChange.bind(this);
        this.handleLoginButton = this.handleLoginButton.bind(this);

        this.state = {
            loginData: {
                login: '',
                password: ''
            },
            error: false,
            errorMessage: 'Неверно указан email или пароль'
        }
    }

    async fetchData() {
        try {
            const result = await login(this.state.loginData);
            this.props.handleToken(result.token);
            localStorage.setItem('userToken', result.token);
            await new Promise(resolve => this.setState({error: false}, resolve));
        } catch (error) {
            console.error('Error:', error.message);
            await new Promise(resolve => this.setState({error: true}, resolve));
        }
    }

    handleDataChange(e) {
        if (e.target.id === "EmailControl") {
            this.setState({
                loginData: {
                    email: e.target.value,
                    password: this.state.loginData.password
                }
            });
        }
        if (e.target.id === "PasswordControl") {
            this.setState({
                loginData: {
                    email: this.state.loginData.email,
                    password: e.target.value
                }
            });
        }
    }

    // onBlur={this.handleDataChange}
    handleLoginButton() {
        this.fetchData().then(() => {
                if (!this.state.error) {
                    window.location.href = '/';
                }
            }
        )
    }

    render() {
        return (
            <div className='container d-flex flex-wrap justify-content-center my-auto'>
                <div className="card col-xl-5 col-lg-7 col-12">
                    <div className="m-3">
                        <h3 className="mb-3">Вход</h3>
                        <div className="mb-4">
                            <label htmlFor="EmailControl" className="form-label">Email</label>
                            <input type="email" className="form-control" id="EmailControl"
                                   onChange={this.handleDataChange}
                                   placeholder="name@example.com"/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="PasswordControl" className="form-label">Пароль</label>
                            <input type="password" className="form-control" id="PasswordControl"
                                   onChange={this.handleDataChange}/>
                        </div>
                        <div className="mb-4">
                            {this.state.error && (
                                <p style={{color: 'red'}}>{this.state.errorMessage}</p>
                            )}
                        </div>
                        <button className="btn btn-primary col-12 mb-2" onClick={this.handleLoginButton}>Войти</button>
                        <Link to='/registration'>
                            <button className="btn btn-secondary col-12">Зарегистрироваться</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPage;