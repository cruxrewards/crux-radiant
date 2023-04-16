import React, { useEffect } from 'react'
import axios from 'axios'
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserState } from '../../../state/slices/userSlice';
import type { RootState } from '../../../state/store';

export default function SignUp() {

    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (user.authenticated) {
            if (user.status === "onboarding") {
                Router.push('/onboarding/user-details')
            } else {
                Router.push("/dashboard/profile");
            }
        }
    })

    if (user.authenticated === undefined) {
        return null;
    }

    function registerUser(e :any) {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirm_password = e.target.confirm_password.value;

        if (validateParams(email, password, confirm_password)) {
            axios.post(`http://localhost:3001/api/v1/onboarding/register_user`, {
                email: email,
                password: password,
            }).then((_) => {
                Router.push("/onboarding/login");
            })
        }
    }

    function validateParams(email:string, password:string, confirm_password:string): boolean  {
        const refinedEmail = email.trim().toLowerCase();
        const refinedPassword = password.trim();
        const refinedConfirmPassword = confirm_password.trim();

        // email and password should not be empty
        if (!refinedEmail) {
            console.log("email empty");
            return false;
        }
        if (password.length < 8) {
            console.log("password must be minimum 8 characters");
            return false;
        }
        if (refinedConfirmPassword !== refinedPassword) {
            console.log("passwords don't match")
            return false;
        }

        //valid email
        if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(refinedEmail)) {
            console.log("email not valid")
            return false;
        }
        return true;
    }

    return (
        <form onSubmit={registerUser}>
            <div className='flex flex-wrap'>
                <div className='w-full md:w-1/2 px-3 mb-3 md:mb-4'>
                    <label className='block font-mono text-white' htmlFor="grid-first-name">Email</label>
                    <input className='block w-full py-2 px-3 bg-gray-200 text-gray-700 font-mono' id="email" type="text" placeholder="example@email.com"/>
                </div>
            </div>

            <div className='flex flex-wrap'>
                <div className='w-full md:w-1/2 px-3 mb-3 md:mb-4'>
                    <label className='block font-mono text-white' htmlFor="grid-last-name">Password</label>
                    <input className='block w-full py-2 px-3 bg-gray-200 text-gray-700 font-mono' id="password" type="password" placeholder="**********"/>
                </div>
            </div>

            <div className='flex flex-wrap'>
                <div className='w-full md:w-1/2 px-3 mb-3 md:mb-4'>
                    <label className='block font-mono text-white' htmlFor="grid-last-name">Confirm Password</label>
                    <input className='block w-full py-2 px-3 bg-gray-200 text-gray-700 font-mono' id="confirm_password" type="password" placeholder="**********"/>
                </div>
            </div>

            <div className='flex justify-center items-center mb-3'>
                <button className='uppercase bg-gold hover:bg-white text-black font-mono py-2 px-20' type='submit'>Sign up</button>
            </div>
        </form>
    )
}