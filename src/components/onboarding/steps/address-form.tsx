import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ACCOUNT_INFO } from "@/graphql/queries/account";
import { UPDATE_USER_DETAIL } from "@/graphql/mutations/account";

interface AddressFormProps {
    setStep(step: number): void;
}

export default function AddressForm({
    setStep
}: AddressFormProps) {
    const { loading: loading, error: error, data: data } = useQuery(GET_ACCOUNT_INFO);
    const [updateUserDetail, { data: userDetailData, loading: userDetailLoading, error: useDetailError }] = useMutation(UPDATE_USER_DETAIL, {
        refetchQueries: [
          GET_ACCOUNT_INFO
        ],
    });

    const [continuable, setContinuable] = useState(false);

    const [street, setStreet] = useState("");
    const [street2, setStreet2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [postalCode, setPostalCode] = useState(0);
    const [country, setCountry] = useState("");

    useEffect(() => {
        if (street !== "" && city !== "" && state !== "" && postalCode !== 0 && country !== "") {
            setContinuable(true);
        } else {
            setContinuable(false);
        }
    })

    useEffect(() => {
        const userDetail = data.getAccountInfo.userDetail
        if (userDetail) {
            setStreet(userDetail.street);
            setStreet2(userDetail.street2);
            setCity(userDetail.city);
            setState(userDetail.region);
            setCountry(userDetail.country);
            setPostalCode(userDetail.postalCode);
        }
    }, [])

    function nextStep() {
        const userInformation = {
            street: street,
            street2: street2,
            city: city,
            region: state,
            postalCode: postalCode,
            country: country,
        }
        updateUserDetail({ variables: { userInformation }})
        setStep(3);
    }

    // function onChange(e) {
    //     const re = /^[0-9\b]+$/;
    //     if (e.target.value === '' || re.test(e.target.value)) {
    //         this.setState()
    //     }
    // }


    if (loading) return null;

    return (
        <>
            <div className='w-full md:w-1/2 px-3 mb-3 md:mb-4'>
                <label className='block font-mono text-black' htmlFor="grid-first-name">Address Line 1 *</label>
                <input className='block w-full py-2 px-3 bg-gray-200 text-gray-700 font-mono' id="address1" type="text" placeholder="76 Sugar Land St."
                    onChange={(e) => setStreet(e.target.value)}
                    value={street}
                />
            </div>
            <div className='w-full md:w-1/2 px-3 mb-3 md:mb-4'>
                <label className='block font-mono text-black' htmlFor="grid-first-name">Address Line 2 *</label>
                <input className='block w-full py-2 px-3 bg-gray-200 text-gray-700 font-mono' id="address2" type="text" placeholder="Unit 1234"
                    onChange={(e) => setStreet2(e.target.value)}
                    value={street2}
                />
            </div>
            <div className='flex flex-wrap'>
                <div className='w-full md:w-1/2 px-3 mb-3 md:mb-4'>
                    <label className='block font-mono text-black' htmlFor="grid-first-name">City *</label>
                    <input className='block w-full py-2 px-3 bg-gray-200 text-gray-700 font-mono' id="city" type="text" placeholder="Las Vegas"
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                    />
                </div>
                <div className='w-full md:w-1/2 px-3 mb-3 md:mb-4'>
                    <label className='block font-mono text-black' htmlFor="grid-last-name">State *</label>
                    <input className='block w-full py-2 px-3 bg-gray-200 text-gray-700 font-mono' id="state" type="text" placeholder="NV"
                        onChange={(e) => setState(e.target.value)}
                        value={state}
                    />
                </div>
                <div className='w-full md:w-1/2 px-3 mb-3 md:mb-4'>
                    <label className='block font-mono text-black' htmlFor="grid-dob">Zipcode *</label>
                    <input className='block w-full py-2 px-3 bg-gray-200 text-gray-700 font-mono' id="zip" placeholder="88901"
                        onChange={(e) => setPostalCode(parseInt(e.target.value))}
                        value={postalCode}
                    />
                </div>
                <div className='w-full md:w-1/2 px-3 mb-3 md:mb-4'>
                    <label className='block font-mono text-black' htmlFor="grid-dob">Country *</label>
                    <input className='block w-full py-2 px-3 bg-gray-200 text-gray-700 font-mono' id="country" type="text" placeholder="US"
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                    />
                </div>
            </div>

            {continuable && <div className='flex justify-center items-center mb-3'>
                <button 
                    className='uppercase bg-gold hover:bg-white text-black font-mono py-2 px-20'
                    onClick={nextStep}
                >
                        Continue
                </button>
            </div>}
            {/* <button onClick={() => setStep(0)}> Back</button> */}
        </>
    )
}