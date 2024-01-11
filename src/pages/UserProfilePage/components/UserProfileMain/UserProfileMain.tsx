import React from 'react';

import AddReactionIcon from '@mui/icons-material/AddReaction';
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import FaceIcon from '@mui/icons-material/Face';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { Box, Card, CardContent } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import styled from 'styled-components';

import StyledCardItem from '@/components/StyledCardItem';
import { useAppSelector } from '@/hooks/redux';
import { IUser } from '@/interfaces/IUser';
import * as authSliceExports from '@/store/slices/auth/authSlice';
import stringAvatar from '@/utils/stringAvatar';

const StyledCard = styled(Card)`
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 600px;
    margin-top: 20px;
    flex-direction: column;
    width: 82vw;
`;
const StyledAvatarBox = styled(Box)`
    display: flex;
    justify-content: space-around;
    min-width: 220px;
    margin: 0 0 20px 0;
`;

const CustomAvatar = styled(Avatar)`
    height: 20vw;
    width: 20vw;
    max-height: 100px;
    max-width: 100px;
`;

const CustomFaceIcon = styled(FaceIcon)`
    height: 20vw;
    width: 20vw;
    max-height: 100px;
    max-width: 100px;
`;
const UserProfileMain: React.FC = () => {
    const fetchedUser: IUser | null = useAppSelector(authSliceExports.authUser);
    const fetchAccountActiveStatus: boolean | null = useAppSelector(
        authSliceExports.accountActiveStatus,
    );

    return (
        <StyledCard>
            <StyledAvatarBox>
                {fetchedUser && (fetchedUser.firstName || fetchedUser.lastName) ? (
                    <CustomAvatar {...stringAvatar(`Ben`)} />
                ) : (
                    <CustomAvatar>
                        <CustomFaceIcon />
                    </CustomAvatar>
                )}
            </StyledAvatarBox>
            <CardContent>
                <StyledCardItem
                    icon={BadgeIcon}
                    value={fetchedUser && fetchedUser.username ? `${fetchedUser.username}` : 'User'}
                    info="User Name:"
                    color="#f8bbd0"
                />
                <StyledCardItem
                    icon={EmailIcon}
                    value={fetchedUser && fetchedUser.email ? `${fetchedUser.email}` : 'Email'}
                    info="Email:"
                    color="#e1bee7"
                />
                <StyledCardItem
                    icon={SupervisorAccountIcon}
                    value={
                        fetchedUser && fetchedUser.role
                            ? `${fetchedUser.role}`
                            : 'EmployeeEmployeeEmployeeEmployeeEmployeeEmployee'
                    }
                    info="Role:"
                    color="#b2dfdb"
                />
                <StyledCardItem
                    icon={AddReactionIcon}
                    value={fetchAccountActiveStatus ? `${fetchAccountActiveStatus}` : 'False'}
                    info="Active:"
                    color="#bbdefb"
                />
            </CardContent>
        </StyledCard>
    );
};

export default UserProfileMain;
