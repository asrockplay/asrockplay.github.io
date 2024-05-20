// App.js
import React from 'react';
import './App.css';
import Menu from './Menu';

function App() {
    return (
        <div className="App">
            <header>
                <h1 className="logo">
                    <img src={process.env.PUBLIC_URL + '/img/logo.png'} alt="Taif's Kebabhaus" />
                </h1>
                <nav id="desktop-nav">
                    <a href="#home">Menü</a>
                    <a href="#about">Über uns</a>
                    <a href="#login">Anmelden</a>
                    <a href="#cart">Warenkorb</a>
                </nav>
            </header>

            <div id="mobile-nav">
                <a href="#home" className="nav-icon" id="home-icon"></a>
                <a href="#about" className="nav-icon" id="about-icon"></a>
                <a href="#login" className="nav-icon" id="login-icon"></a>
                <a href="#cart" className="nav-icon" id="cart-icon"></a>
            </div>

            <main>
                <Menu />
            </main>
        </div>
    );
}

export default App;
