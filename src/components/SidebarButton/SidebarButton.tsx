import * as React from 'react';
import { useState } from 'react';

import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BusinessIcon from '@mui/icons-material/Business';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListIcon from '@mui/icons-material/List';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.div`
    display: flex;
`;
const Sidebar = styled.div`
    text-transform: capitalize;
    position: absolute;
    left: 30px;
    top: 150px;
`;
const HomeButton = styled.div`
    margin-bottom: 5px;
`;
const CustomNavLink = styled(NavLink)`
    height: 30px;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: black;
    margin-bottom: 5px;
    gap: 15px;
    &:hover {
        background-color: lightgrey;
        transition: all 1s;
    }
    &:active {
        background-color: lightgrey;
    }
`;

const Icon = styled.div`
    display: flex;
    align-items: center;
`;

const MainContent = styled.main`
    width: 100%;
    padding: 20px;
`;

const SidebarButton = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const menuItem = [
        { id: 1, path: '/', name: 'company profile', icon: <BusinessIcon /> },
        { id: 2, path: '/', name: 'company dashboard', icon: <DashboardIcon /> },
        { id: 3, path: '/', name: 'org members', icon: <AssignmentIndIcon /> },
    ];
    const customNavLinkStyle = {
        width: isOpen ? '200px' : '20px',
    };
    return (
        <SidebarContainer>
            <Sidebar>
                <HomeButton>
                    <ListIcon onClick={toggle} />
                </HomeButton>
                {menuItem.map((item) => (
                    <CustomNavLink to={item.path} key={item.id} style={customNavLinkStyle}>
                        <Icon>{item.icon}</Icon>
                        <p style={{ display: isOpen ? 'block' : 'none' }}>{item.name}</p>
                    </CustomNavLink>
                ))}
            </Sidebar>
            <MainContent>{children}</MainContent>
        </SidebarContainer>
    );
};

export default SidebarButton;
