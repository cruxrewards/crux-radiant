import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ACCOUNT_INFO } from "@/graphql/queries/account";
import { UPDATE_USER_DETAIL } from "@/graphql/mutations/account";
import DefaultBodyWrapper from "@/components/core/defaultBodyWrapper";

interface SSNFormProps {
    goNextStep(): void;
}

export default function SSNForm({
    goNextStep
}: SSNFormProps) {
    const { loading: loading, error: error, data: data } = useQuery(GET_ACCOUNT_INFO);
    const [updateUserDetail, { data: userDetailData, loading: userDetailLoading, error: useDetailError }] = useMutation(UPDATE_USER_DETAIL, {
        refetchQueries: [
          GET_ACCOUNT_INFO
        ],
    });

    const [continuable, setContinuable] = useState(false);
    const [ssn, setSSN] = useState(0);

    useEffect(() => {
        if (ssn != 0 && ssn) {
            setContinuable(true);
        } else {
            setContinuable(false);
        }
    })

    useEffect(() => {
        const userDetail = data.getAccountInfo.userDetail
        if (userDetail) {
            setSSN(userDetail.govId)
        }
    }, [])

    function nextStep() {
        const userInformation = {
            govId: ssn
        }
        updateUserDetail({ variables: { userInformation }})
        goNextStep();
    }

    return (
      <DefaultBodyWrapper>
        <div className="flex flex-col w-full items-center space-y-4 p-8">
          <div className="w-full md:w-1/2">
            <label>Social Security Number*</label>
            <input 
              className='block w-full py-2 px-3 bg-gray-200 text-gray-700 font-mono' id="ssn" type="number" placeholder="123456789"
              onChange={(e) => setSSN(parseInt(e.target.value))}
              value={ssn}
            />
          </div>
          <button className='uppercase bg-gold hover:bg-white text-black font-mono py-2 px-20'>
            Continue
          </button>
        </div>
      </DefaultBodyWrapper>
    )
}
