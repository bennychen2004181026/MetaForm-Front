import React from 'react';

interface RequiredLabelProps {
    label: string;
    isRequired: boolean;
}

const RequiredLabel: React.FC<RequiredLabelProps> = ({ label, isRequired }): React.JSX.Element => {
    return (
        <>
            _{isRequired && <span style={{ color: 'red' }}>*</span>}
            {label}
        </>
    );
};

export default RequiredLabel;
