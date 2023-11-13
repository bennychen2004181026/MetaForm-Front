import React from 'react';

import { Link } from 'react-router-dom';

import styles from './EmailButton.module.scss';

const EmailButton = () => (
    <Link to="signupEmail" className={styles.emailbtnsection}>
        <button type="button" className={styles.emailbtn}>
            Sign up with email
        </button>
    </Link>
);

export default EmailButton;
