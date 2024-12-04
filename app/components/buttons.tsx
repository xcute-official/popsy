"use client";

interface ButtonProps {
    children: React.ReactNode;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset' | undefined;
    onClick?: ()=>void;
}

export const Button: React.FC<ButtonProps> = ({
    children, disabled, type, onClick
})=>{
    return (
        <button disabled={disabled} onClick={onClick} type={type}>
            {children}
        </button>
    )
}