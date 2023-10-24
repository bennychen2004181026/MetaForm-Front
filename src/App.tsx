import React from 'react';

import AppRoute from './routes/AppRoute';

const App = () => {
    const initDivTestStyle = {
        backgroundColor: 'lightblue',
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    };
    return (
        <div className="initDivTest" style={initDivTestStyle}>
            <AppRoute />
        </div>
    );
};

export default App;
