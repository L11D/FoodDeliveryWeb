import React from 'react';
import '../App.css';
import {Link} from 'react-router-dom'; // Подключаем Link для создания ссылок

const Footer = () => {
    return (
        <footer className="footer bg-light py-1 mt-auto ">
            <div className="container d-flex align-content-end ">
                <p>© 2023 - Slon blog</p>
            </div>
        </footer>
    );
};

export default Footer;