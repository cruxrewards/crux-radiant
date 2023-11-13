import React, { useState } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ACCOUNT_INFO } from "@/graphql/queries/account";
import { UPDATE_USER_DETAIL } from "@/graphql/mutations/account";
import NamePhoneDOBForm from "./name-phone-dob-form";
import PhoneVerification from "./phone-verification";
import AddressForm from "./address-form";
import SSNForm from "./ssn-form";

function getStepNumber(data: any) {
    if (!data.getAccountInfo.userDetail || data.getAccountInfo.userDetail.govId) {
        return 0
    } else if (!data.getAccountInfo.phoneConfirmed) {
        return 1
    } else if (!data.getAccountInfo.userDetail.street) {
        return 2
    } else {
        return 3
    }
}

interface ApplicationFormProps {
    nextStep(): void;
}

export default function ApplicationForm({nextStep}: ApplicationFormProps) {
    const { loading: accountLoading, error: accountError, data: accountData } = useQuery(GET_ACCOUNT_INFO);

    const [updateUserDetail, { data, loading, error }] = useMutation(UPDATE_USER_DETAIL, {
        refetchQueries: [
          GET_ACCOUNT_INFO
        ],
    });
    const [stepNumber, setStepNumber]  = useState(getStepNumber(accountData));

    const applicationSteps = [
        <NamePhoneDOBForm
            setStep={setStepNumber}
        />,
        <PhoneVerification
            setStep={setStepNumber}
        />,
        <AddressForm
            setStep={setStepNumber}
        />,
        <SSNForm
            goNextStep={nextStep}
        />
    ]

    const currentStep = applicationSteps[stepNumber];

    return (
        <div className="border: 2px solid black">
            {/* <form>
                <div className="flex flex-row space-x-4">
                    <div className="w-1/2">
                        <label className='block font-mono' htmlFor="grid-first-name">First Name *</label>
                        <input className='block w-full py-2 px-3 text-gray-700 font-mono border border-gray-700 hover:border-custom_purple' id="firstName" type="text" placeholder="Jane"/>
                    </div>
                    <div className="w-1/2">
                        <label className='block font-mono' htmlFor="grid-last-name">Last Name *</label>
                        <input className='block w-full py-2 px-3 text-gray-700 font-mono border border-gray-700 hover:border-custom_purple' id="lastName" type="tel" placeholder="Doe"/>
                    </div>
                </div>
                <div className="flex flex-row space-x-4">
                    <div className="w-1/2">
                        <label className='block font-mono' htmlFor="grid-first-name">Date of Birth *</label>
                        <input className='block w-full py-2 px-3 text-gray-700 font-mono border border-gray-700 hover:border-custom_purple' id="firstName" type="date"/>
                    </div>
                    <div className="w-1/2">
                        <label className='block font-mono' htmlFor="grid-last-name">Phone *</label>
                        <input className='block w-full py-2 px-3 text-gray-700 font-mono border border-gray-700 hover:border-custom_purple' id="lastName" type="tel" placeholder="123-456-7890"/>
                    </div>
                </div>
                <div className="flex flex-col items-center mt-24">
                    <button className="uppercase border border-gray-700 hover:bg-gray-700 text-gray-700 hover:text-white font-mono py-2 px-10" type="submit">Submit</button>
                </div>
            </form> */}
            {currentStep}
        </div>
    )
}