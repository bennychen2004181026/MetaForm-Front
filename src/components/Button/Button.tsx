import styled from 'styled-components';

const StyledButton = styled.button`
    background-color: #007bff;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.2s;

    &:hover {
        background-color: #0056b3;
    }
`;

export default StyledButton;
