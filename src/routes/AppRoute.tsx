import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ForgetPasswordPage from '@/pages/ForgetPasswordPage';
import MainPage from '@/pages/MainPage';
import RegisterEmailPage from '@/pages/RegisterEmailPage';
import RegisterOptionPage from '@/pages/RegisterOptionPage';

const AppRoute = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/registeroption" element={<RegisterOptionPage />} />
            <Route path="/registeremail" element={<RegisterEmailPage />} />
            <Route path="/forgetpassword" element={<ForgetPasswordPage />} />
        </Routes>
    </BrowserRouter>
);
export default AppRoute;
