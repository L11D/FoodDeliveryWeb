import React from "react";
import InputMask from 'react-input-mask';
import {register} from "../Requests";

class RegistrationPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleDataChange = this.handleDataChange.bind(this);
        this.handleDataBlur = this.handleDataBlur.bind(this);
        this.handleRegisterButton = this.handleRegisterButton.bind(this);

        this.state = {
            name: '',
            nameError: true,
            nameTouched: false,

            phoneNumber: '',
            phoneNumberError: false,

            birthDate: '',
            birthDateTouched: false,

            gender: 'Male',

            email: '',
            emailError: true,
            emailTouched: false,

            password: '',
            passwordError: true,
            passwordTouched: false,

            error: false,
            errorMessage: 'Пользователь с такими данными уже существует'
        }
    }

    async fetchData() {
        try {
            const result = await register(
                {
                    fullName: this.state.name,
                    password: this.state.password,
                    email: this.state.email,
                    birthDate: this.state.birthDate === '' ? null : new Date(this.state.birthDate),
                    gender: this.state.gender,
                    phoneNumber: this.state.phoneNumber === '' ? null : this.state.phoneNumber
                }
            );
            this.props.handleToken(result.token);
            localStorage.setItem('userToken', result.token);
            await new Promise(resolve => this.setState({error: false}, resolve));
        } catch (error) {
            console.error('Error:', error.message);
            await new Promise(resolve => this.setState({error: true}, resolve));
        }
    }

    handleDataBlur(e) {
        if (e.target.id === "NameControl") {
            if (e.target.value.length < 1 || e.target.value.length > 1000)
            {
                this.setState({nameError: true})
            }
            else
            {
                this.setState({nameError: false})
            }
            this.setState({name: e.target.value, nameTouched: true});
        }

        if (e.target.id === "BirthDateControl") {
            let selectedDate = new Date(e.target.value);
            let minDate = new Date("1900-01-01");
            let maxDate = new Date();

            if (selectedDate >= minDate && selectedDate <= maxDate) {
                this.setState({birthDate: e.target.value});
            } else {
                this.setState({birthDate: ''});
            }
            this.setState({birthDateTouched: true});
        }

        if (e.target.id === "EmailControl") {
            if (this.isValidEmail(e.target.value))
                this.setState({email: e.target.value, emailError: false});
            else
                this.setState({emailError: true});
            this.setState({emailTouched: true});
        }

        if (e.target.id === "GenderSelectControl") {
            this.setState({gender: e.target.value});
        }

        if (e.target.id === "PasswordControl") {
            if (this.isValidPassword(e.target.value))
                this.setState({password: e.target.value, passwordError: false});
            else
                this.setState({passwordError: true});
            this.setState({passwordTouched: true});
        }


        if (e.target.id === "PhoneControl") {
            let number = e.target.value.replace(/\D/g, '');
            if (number.length === 11)
                this.setState({phoneNumber: number, phoneNumberError: false});
            else if (number === '')
            {
                this.setState({phoneNumberError: false});
            }
            else {
                console.log(e.target.value)
                this.setState({phoneNumberError: true});
            }
        }

        this.setState({error: false});
    }

    handleDataChange(e) {
        if (e.target.id === "BirthDateControl") {
            this.setState({birthDate: e.target.value});
        }
        if (e.target.id === "PhoneControl") {
            this.setState({phoneNumber: e.target.value});
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    isValidPassword(password) {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
        return passwordRegex.test(password);
    };

    handleRegisterButton() {
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
                <div className="card col-xl-5 col-lg-7 col-12"
                >
                    <div className="m-3">
                        <h3 className="mb-3">Регистрация</h3>

                        <div className="mb-4">
                            <label htmlFor="NameControl" className="form-label">ФИО</label>
                            <input type="text" className="form-control" id="NameControl"
                                   onBlur={this.handleDataBlur}
                                   placeholder="Слонов Слон Слоныч"/>
                        </div>

                        {(this.state.nameError && this.state.nameTouched) && (
                            <p style={{color: 'red'}}>ФИО не может быть пустым или превышать 1000 символов</p>
                        )}

                        <div className="mb-4">
                            <label htmlFor="BirthDateControl" className="form-label">Дата рождения</label>
                            <input
                                type="date"
                                className="form-control"
                                id="BirthDateControl"
                                min="1900-01-01"
                                max={new Date().toISOString().split('T')[0]}
                                value={this.state.birthDate}
                                onBlur={this.handleDataBlur}
                                onChange={this.handleDataChange}/>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="GenderSelectControl" className="form-label">Пол</label>
                            <select className="form-select" id="GenderSelectControl" onChange={this.handleDataChange} value={this.state.gender}>
                                <option value="Male">Мужской</option>
                                <option value="Female">Женский</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="PhoneControl" className="form-label">Телефон</label>
                            <InputMask
                                mask="+7 (999) 999-99-99"
                                maskChar="_"
                                id="PhoneControl"
                                className="form-control"
                                onBlur={this.handleDataBlur}
                                value={this.state.phoneNumber}
                                onChange={this.handleDataChange}
                                placeholder="+7 (800) 555-35-35"
                            />
                        </div>

                        {(this.state.phoneNumberError && this.state.phoneNumber !== '')&& (
                            <p style={{color: 'red'}}>Введите телефон в формате +7 (xxx) xxx-xx-xx</p>
                        )}

                        <div className="mb-4">
                            <label htmlFor="EmailControl" className="form-label">Email</label>
                            <input type="email" className="form-control" id="EmailControl"
                                   onBlur={this.handleDataBlur}
                                   placeholder="name@example.com"/>
                        </div>

                        {this.state.emailError && this.state.emailTouched && (
                            <p style={{color: 'red'}}>Некорректный email</p>
                        )}

                        <div className="mb-4">
                            <label htmlFor="PasswordControl" className="form-label">Пароль</label>
                            <input type="password" className="form-control" id="PasswordControl"
                                   onBlur={this.handleDataBlur}/>
                        </div>

                        {this.state.passwordError && this.state.passwordTouched && (
                            <p style={{color: 'red'}}>Пароль должен содержать минимум 6 символов, хотя бы одну цифру и
                                букву</p>
                        )}

                        <div className="mb-4">
                            {this.state.error && (
                                <p style={{color: 'red'}}>{this.state.errorMessage}</p>
                            )}
                        </div>

                        {!(this.state.nameError || this.state.emailError || this.state.phoneNumberError || this.state.passwordError || this.state.error) ?
                            (
                                <button className="btn btn-primary col-12"
                                        onClick={this.handleRegisterButton}>Зарегистрироваться
                                </button>
                            )
                            :
                            (
                                <button className="btn btn-primary disabled col-12"
                                        onClick={this.handleRegisterButton}>Зарегистрироваться
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default RegistrationPage;