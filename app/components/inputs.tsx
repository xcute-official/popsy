"use client";

import clsx from "clsx";
import { useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { SIZE_XS } from "../constants/classConstants";



interface FormTextInputProps {
    label?: string;
    placeholder?: string;

    disabled?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;

    type?: 'text' | 'email';

    id: string;
    required?: boolean;
}
export const FormTextInput: React.FC<FormTextInputProps> = ({
    label, placeholder, disabled, register, errors, type, id, required
})=>{
    return (
        <div>
            {
                label && (
                    <label htmlFor={id}>{label}</label>
                )
            }
            <div>
                <input disabled={disabled} type={type} placeholder={placeholder} id={id} {...register(id, {required})} autoComplete={id} className={clsx(
                    errors && '',
                    'w-full'
                )}/>
            </div>
        </div>
    )
}








interface FormPasswordInputProps {
    label?: string;
    placeholder?: string;

    disabled?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;



    id: string;
    required?: boolean;
}
export const FormPasswordInput: React.FC<FormPasswordInputProps> = ({
    label, placeholder, disabled, register, errors, id, required
})=>{
    const [type, setType] = useState<'password' | 'text'>('password');
    return (
        <div>
            {
                label && (
                    <label htmlFor={id}>{label}</label>
                )
            }
            <div className="relative">
                <input type={type} disabled={disabled} placeholder={placeholder} id={id} {...register(id, {required})} autoComplete={id} className={clsx(
                    errors && '',
                    'w-full'
                )}/>
                <button type="button" onClick={()=>setType(type==='password'?'text':'password')} className="absolute top-1/2 transform -translate-y-1/2 right-2">
                    {
                        type === 'password' ? (
                            <FiEye className={clsx(
                                SIZE_XS,
                            )} />
                        ) : (   
                            <FiEyeOff className={clsx(
                                SIZE_XS
                            )} />
                        )
                    }
                </button>
            </div>
        </div>
    )
}