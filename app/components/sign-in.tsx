"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { signin } from '../actions/authenticating';

import { FormPasswordInput, FormTextInput } from './inputs';
import { Button } from './buttons';
import Link from 'next/link';
import ErrorMessage from './error-message';
import SuccessMessage from './success-message';
import { FiLoader } from 'react-icons/fi';
import { SIZE_SM } from '../constants/classConstants';

const SignIn = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const {
    register,
    formState: {
      errors
    },
    handleSubmit
  } = useForm<FieldValues>({
    defaultValues: {
      id: '',
      password: '',
      code: ''
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data)=>{
    setIsLoading(true);
    setError('');
    setSuccess('');
    signin(data).then((response)=>{
      if(response.success && response.redirectedTo){
        setSuccess(response.success);
        router.push(response.redirectedTo);
      }else if(response.error){
        setError(response.error);
      }else{
        setError('Unknown error, please try again');
      }
    }).catch((error)=>{
      console.log(error);
      setError('Unknown server damaging error');
    }).finally(()=>{
      setIsLoading(false);
    })
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <FormTextInput label='username, email' id='id' register={register} errors={errors} disabled={isLoading} type='text' />
          <FormPasswordInput label='password' id='password' register={register} errors={errors} disabled={isLoading} />
        </div>
        <Link href={'/'}>
          <div>
            <span>ForGot password?</span>
          </div>
        </Link>
        <ErrorMessage message={error} />
        <SuccessMessage message={success} />
        <Button type='submit'>{
          !isLoading ? (
            <div>signin</div>
          ) : (
            <div className='flex items-center gap-2 justify-center'>
              <FiLoader className={SIZE_SM} />
              <span>signing you</span>
            </div>
          )
        }</Button>
        <Link href={'/'}>
          <div>
            <span>Don&apos;t have an account? signin</span>
          </div>
        </Link>
      </form>
    </div>
  )
}

export default SignIn