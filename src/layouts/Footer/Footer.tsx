import React, { useMemo } from 'react';

import FooterItem from '@/components/FooterItem/FooterItem';
import { useAppSelector } from '@/hooks/redux';
import { Div } from '@/layouts/Footer/Footer.styles';
import { accountStatus, authUser, authUserId } from '@/store/slices/auth/authSlice';

const Footer = () => {
    const fetchedUser = useAppSelector(authUser);
    const fetchAccountStatus = useAppSelector(accountStatus);
    const fetchUserId = useAppSelector(authUserId);

    const footerLink = useMemo(() => {
        if (!fetchedUser) {
            return '/login';
        }
        if (!fetchAccountStatus) {
            return `/company-profile/${fetchUserId}`;
        }
        return '/forms';
    }, [fetchedUser, fetchAccountStatus, fetchUserId]);

    return (
        <Div>
            <FooterItem text="company address" footerLink={footerLink} />
            <FooterItem text="Cookie Settings" footerLink={footerLink} />
            <FooterItem text="Check our Cookie Policy to delete cookies" footerLink={footerLink} />
            <FooterItem text="&copy; Metaform" footerLink={footerLink} />
        </Div>
    );
};
export default Footer;
