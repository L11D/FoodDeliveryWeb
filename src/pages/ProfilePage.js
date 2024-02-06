import React from "react";
import InputMask from 'react-input-mask';
import {getProfile, setProfile} from "../Requests";

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.handleDataChange = this.handleDataChange.bind(this);
        this.handleDataBlur = this.handleDataBlur.bind(this);
        this.handleSaveButton = this.handleSaveButton.bind(this);

        let userToken = localStorage.getItem('userToken') || '';

        this.state = {
            userToken: userToken,

            name: '',
            nameError: true,
            nameTouched: false,

            phoneNumber: '',
            phoneNumberError: false,
            phoneTouched: false,

            birthDate: '',
            birthDateTouched: false,

            gender: 'Male',

            email: '',
            emailTouched: false,
        }
    }

    componentDidMount() {
        if (this.state.userToken !== '')
        {
            getProfile(this.state.userToken)
                .then((result) => {
                    this.setState({
                        name: result.fullName,
                        phoneNumber: result.phoneNumber == null ? '' : result.phoneNumber,
                        birthDate: result.birthDate == null ? '' : result.birthDate.split('T')[0],
                        gender: result.gender,
                        email: result.email,
                    });
                })
                .catch((error) => {
                    console.log('Error:', error.message);

                    window.location.href = '/login';
                });
        }
        else
        {
            window.location.href = '/login';
        }
    }

    setData() {
        setProfile( this.state.userToken,
            {
                fullName: this.state.name,
                email: this.state.email,
                birthDate: this.state.birthDate === '' ? null : new Date(this.state.birthDate),
                gender: this.state.gender,
                phoneNumber: this.state.phoneNumber === '' ? null : this.state.phoneNumber
            }
        ).then((result) => {

        }).catch((error) => {
            console.log('Error:', error.message);
            this.setState({error: true})
        });
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

        if (e.target.id === "PhoneControl") {
            let number = e.target.value.replace(/\D/g, '');
            if (number.length === 11)
                this.setState({phoneNumber: number, phoneNumberError: false});
            else if(number === '')
            {
                this.setState({phoneNumberError: false});
            }
            else {
                this.setState({phoneNumberError: true});
            }
            this.setState({phoneTouched: true});
        }

        this.setState({error: false});
    }

    handleDataChange(e) {
        if (e.target.id === "NameControl") {
            this.setState({name: e.target.value});
        }
        if (e.target.id === "BirthDateControl") {
            this.setState({birthDate: e.target.value});
        }
        if (e.target.id === "EmailControl") {
            this.setState({email: e.target.value});
        }
        if (e.target.id === "GenderSelectControl") {
            this.setState({gender: e.target.value});
        }
        if (e.target.id === "PhoneControl") {
            this.setState({phoneNumber: e.target.value});
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    handleSaveButton() {
        this.setData()
    }

    render() {
        return (
            <div className='container d-flex flex-wrap justify-content-center my-auto'>
                <div className="card  col-lg-10 col-12"
                >
                    <div className="m-3">
                        <h3 className="mb-3">Профиль</h3>

                        <div className="mb-4 row">
                            <div className='col'>
                                <label htmlFor="EmailControl" className="form-label col">Email</label>

                            </div>
                            <div className='col-lg-9'>
                                <input type="email" className="form-control col-5" id="EmailControl"
                                       onBlur={this.handleDataBlur}
                                       onChange={this.handleDataChange}
                                       value={this.state.email}
                                       placeholder="name@example.com"/>
                            </div>
                        </div>

                        {this.state.emailError && this.state.emailTouched && (
                            <p style={{color: 'red'}}>Некорректный email</p>
                        )}

                        <div className="mb-4 row">
                            <div className="col">
                                <label htmlFor="NameControl" className="form-label">ФИО</label>
                            </div>
                            <div className="col-lg-9">
                                <input type="text" className="form-control" id="NameControl"
                                       value={this.state.name}
                                       onBlur={this.handleDataBlur}
                                       onChange={this.handleDataChange}
                                       placeholder="Слонов Слон Слоныч"/>
                            </div>

                        </div>

                        {(this.state.nameError && this.state.nameTouched) && (
                            <p style={{color: 'red'}}>ФИО не может быть пустым или превышать 1000 символов</p>
                        )}

                        <div className="mb-4 row">
                            <div className="col">
                                <label htmlFor="PhoneControl" className="form-label">Телефон</label>
                            </div>
                            <div className="col-lg-9">
                                <InputMask
                                    mask="+7 (999) 999-99-99"
                                    maskChar="_"
                                    id="PhoneControl"
                                    className="form-control"
                                    value={this.state.phoneNumber}
                                    onBlur={this.handleDataBlur}
                                    onChange={this.handleDataChange}
                                    placeholder="+7 (800) 555-35-35"
                                />
                            </div>
                        </div>

                        {(this.state.phoneNumberError && this.state.phoneNumber !== '') && (
                            <p style={{color: 'red'}}>Введите телефон в формате +7 (xxx) xxx-xx-xx</p>
                        )}

                        <div className="mb-4 row">
                            <div className="col">
                                <label htmlFor="GenderSelectControl" className="form-label">Пол</label>
                            </div>
                            <div className="col-lg-9">
                                <select className="form-select" id="GenderSelectControl" onBlur={this.handleDataBlur}
                                        onChange={this.handleDataChange} value={this.state.gender}>
                                    <option value="Male">Мужской</option>
                                    <option value="Female">Женский</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-4 row">
                            <div className="col">
                                <label htmlFor="BirthDateControl" className="form-label">Дата рождения</label>
                            </div>
                            <div className="col-lg-9">
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

                        </div>

                        <div className='d-flex justify-content-end'>
                            {!(this.state.nameError || this.state.phoneNumberError || this.state.emailError) ?
                                (
                                    <button className="btn btn-primary col-12 col-lg-2"
                                            onClick={this.handleSaveButton}>Сохранить
                                    </button>
                                )
                                :
                                (
                                    <button className="btn btn-primary disabled col-12 col-lg-2"
                                            onClick={this.handleSaveButton}>Сохранить
                                    </button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfilePage;