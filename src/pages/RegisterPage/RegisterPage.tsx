import React from 'react';

import EmailButton from './components/EmailButton';
import GoogleButton from './components/GoogleButton';
import styles from './RegisterPage.module.scss';

const RegisterPage = () => {
    return (
        <div className={styles.content}>
            <strong className={styles.title}>Create your account</strong>
            <GoogleButton />
            <div className={styles.text}>or</div>
            <EmailButton />
        </div>
    );
};

export default RegisterPage;
