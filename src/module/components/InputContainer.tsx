import React from 'react';

interface InputContainerProps {
    className?: string;
    children: React.ReactNode;
}

const InputContainer: React.FC<InputContainerProps> = ({ className = "", children }) => {
    return (

        <div className={`container mx-auto p-4 ${className}`}>
            {children}
        </div>
    );
};

export default InputContainer;