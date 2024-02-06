import React from 'react';
import {getProfile, userLogout} from "../Requests";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.fetchData = this.fetchData.bind(this);
        this.logout = this.logout.bind(this);

        let userToken = localStorage.getItem('userToken') || '';
        this.state = {
            userToken: userToken,
            username: ''
        }
    }

    componentDidMount() {
        if (this.state.userToken !== '') {
            this.fetchData()
        }
    }

    fetchData() {
        getProfile(this.state.userToken)
            .then((result) => {
                this.setState({username: result.email});
            })
            .catch((error) => {
                console.log('Error:', error.message);
            });
    }

    logout() {
        localStorage.removeItem('userToken');
        userLogout(this.state.userToken)
            .then((result) => {
                this.setState({userToken: '', username: ''});
                window.location.href = window.location.search;
            })
            .catch((error) => {
                console.log('Error:', error.message);
            });
    }

    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">Slon blog</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <a className="nav-link active" aria-current="page" href="/">Главная</a>
                                {this.state.username !== '' && (
                                    <a className="nav-link" href="/authors">Авторы</a>
                                )}
                                {this.state.username !== '' && (
                                    <a className="nav-link" href="/communities">Группы</a>
                                )}

                            </div>
                            <div className="nav-item dropdown ms-auto mx-5">
                                {this.state.username === '' ?
                                    <a className="nav-link" href="/login">Войти</a>
                                    :
                                    (
                                        <div>
                                            <a className="nav-link dropdown-toggle" href="#" role="button"
                                               data-bs-toggle="dropdown"
                                               aria-expanded="false">
                                                {this.state.username}
                                            </a>
                                            <ul className="dropdown-menu dropdown-menu-end">
                                                <li><a className="dropdown-item" href="/profile">Профиль</a></li>
                                                <li>
                                                    <button className="dropdown-item" onClick={this.logout}>Выйти
                                                    </button>
                                                </li>

                                            </ul>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;