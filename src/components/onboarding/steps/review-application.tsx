import React, { useState } from "react";
import Router from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ACCOUNT_INFO } from "@/graphql/queries/account";
import { COMPLETE_APPLICATION } from "@/graphql/mutations/onboarding";
import Link from "next/link";

interface ReviewApplicationProps {
    previousStep(): void;
}

export default function ReviewApplication({
    previousStep
}: ReviewApplicationProps) {
    const { loading: loading, error: error, data: data } = useQuery(GET_ACCOUNT_INFO);
    const [completeApplication, { data: cData, loading: cLoading, error: cError }] = useMutation(COMPLETE_APPLICATION, {
        refetchQueries: [
          GET_ACCOUNT_INFO
        ],
    });

    if (loading) return null;

    return (
        <>
            <h1>{`${data.getAccountInfo.userDetail.firstName } ${data.getAccountInfo.userDetail.lastName}`}</h1>
            <h1>{data.getAccountInfo.userDetail.phone}</h1>
            <h1>{data.getAccountInfo.userDetail.dob}</h1>
            <h1>{data.getAccountInfo.userDetail.street}</h1>
            <h1>{data.getAccountInfo.userDetail.street2}</h1>
            <h1>{data.getAccountInfo.userDetail.city}</h1>
            <h1>{data.getAccountInfo.userDetail.region}</h1>
            <h1>{data.getAccountInfo.userDetail.postalCode}</h1>
            <h1>{data.getAccountInfo.userDetail.country}</h1>
            <h1>{data.getAccountInfo.userDetail.govId}</h1>

            <button onClick={previousStep}>Back</button>
            <button 
                onClick = {() => {
                    completeApplication();
                    Router.push('/dash')
                }}
            >
                Complete Application
            </button>
        </>
    )
}