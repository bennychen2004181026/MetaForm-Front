import React from 'react'
import ForgetPasswordPage from './pages/ForgetPasswordPage/ForgetPasswordPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';


const App = () => {
    const initDivTestStyle = {
        backgroundColor: 'lightblue',
        padding:'20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    }
    return(
        <div className="initDivTest" style={initDivTestStyle} >
    <ForgetPasswordPage />
    <HomePage />
    <LoginPage />
    <RegisterPage />
</div>
    )
}


export default App;
