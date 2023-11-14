import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import { CONFIRM_PHONE } from '@/graphql/mutations/onboarding';
import { GET_ACCOUNT_INFO } from "@/graphql/queries/account";

interface PhoneVerificationProps {
    setStep(step: number): void;
}

export default function PhoneVerification({
    setStep
}: PhoneVerificationProps) {
    const [confirmPhone, { data, loading, error }] = useMutation(CONFIRM_PHONE, {
        refetchQueries: [
            GET_ACCOUNT_INFO
          ],
    });

    const [codeError, setCodeError] = useState("");

    async function validateCode(e: any) {
        e.preventDefault();
        setCodeError("");

        const confirmationToken = e.target.value;
        if (confirmationToken.length === 6) {
            await confirmPhone({ variables: { confirmationToken }}).then((data) =>{
                if (data.data.confirmPhone.status === "failure") {
                    setCodeError("Invalid Code")
                } else {
                    setStep(2);
                }
            }) 
        }
    }

    return (
      <>
        <div className="flex flex-col items-center">
            <p className="text-center font-mono">A verification code has been sent to your phone.
            <br/>Code expires in 30 minutes.</p>
        </div>
        <div className="flex flex-col items-center">
            <input 
                className="w-1/2 text-5xl text-center border border-gray-700 py-2 px-10 mt-10 uppercase font-bebas"
                type="text"
                maxLength={6}
                onChange={validateCode}
            ></input>
            <h1> { codeError } </h1>
        </div>
        <div className="mx-auto max-w-lg align-center py-2">
            <p className="text-center font-mono">Didn't receive a code? <span className="font-bold text-custom_purple">Try again.</span></p>
        </div>
      </>
    )
}