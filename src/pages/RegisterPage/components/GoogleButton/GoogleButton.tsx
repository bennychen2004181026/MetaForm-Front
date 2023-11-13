import React from 'react';

import { Link } from 'react-router-dom';

import googleIcon from '../../../../assets/images/google-icon-logo.png';

import styles from './GoogleButton.module.scss';

const GoogleButton = () => (
    <Link to="signupEmail" className={styles.googlebtnsection}>
        <button type="button" className={styles.googlebtn}>
            <img alt="googleIcon" src={googleIcon} className={styles.googleicon} />
            Sign up with Google
        </button>
    </Link>
);

export default GoogleButton;
