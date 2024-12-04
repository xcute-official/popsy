import clsx from 'clsx';
import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa';

import { SIZE_XS } from '../constants/classConstants';
interface ErrorMessageProps {
    message?: string;
}
const ErrorMessage: React.FC<ErrorMessageProps> = ({
    message
}) => {
    if(!message){
        return null;
    }
  return (
    <div className='flex items-center gap-2'>
        <FaExclamationTriangle className={clsx(SIZE_XS)} />
        <span>{message}</span>
    </div>
  )
}

export default ErrorMessage