import React from 'react';
import './App.css';
import Menu from './Menu';

function App() {
    return (
        <div className="App">
            <head>
                <script>
                    {`
                        function isMobile() {
                            return /Mobi|Android/i.test(navigator.userAgent);
                        }

                        if (isMobile()) {
                            document.documentElement.style.setProperty('--config-menu-height', '100%');
                            document.documentElement.style.setProperty('--config-menu-content-height', '100%');
                            document.documentElement.style.setProperty('--config-item-image-max-height', '30vh');
                        } else {
                            document.documentElement.style.setProperty('--config-menu-height', '100vh');
                            document.documentElement.style.setProperty('--config-menu-content-height', 'calc(100% - 50px)');
                            document.documentElement.style.setProperty('--config-item-image-max-height', 'initial');
                        }
                    `}
                </script>
            </head>
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
