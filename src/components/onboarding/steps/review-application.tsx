import React, { useState } from "react";
import Router from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ACCOUNT_INFO } from "@/graphql/queries/account";
import { COMPLETE_APPLICATION } from "@/graphql/mutations/onboarding";
import Link from "next/link";
import DefaultBodyWrapper from "@/components/core/defaultBodyWrapper";

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
    <DefaultBodyWrapper>
      <div className="grow flex flex-col w-full p-4">
        <button
          className="justify-left w-fit my-2 px-8 py-2 border border-black rounded hover:bg-black hover:text-white"
          onClick={previousStep}>
            Back
        </button>

        <div className="flex flex-col divide-y divide-black">
          <div className="py-2">
            <h2 className="text-2xl">Profile</h2>
            <div className="px-4 py-2">
              <p>Name: {`${data.getAccountInfo.userDetail.firstName } ${data.getAccountInfo.userDetail.lastName}`}</p>
              <p>Phone: {data.getAccountInfo.userDetail.phone}</p>
              <p>Date of Birth: {data.getAccountInfo.userDetail.dob}</p>
            </div>
          </div>

          <div className="py-2">
            <h2 className="text-2xl">Address</h2>
            <div className="px-4 py-2">
              

              <h1>{data.getAccountInfo.userDetail.street}</h1>
              <h1>{data.getAccountInfo.userDetail.street2}</h1>
              <h1>{data.getAccountInfo.userDetail.city}</h1>
              <h1>{data.getAccountInfo.userDetail.region}</h1>
              <h1>{data.getAccountInfo.userDetail.postalCode}</h1>
              <h1>{data.getAccountInfo.userDetail.country}</h1>
            </div>
          </div>

          <div className="py-2">
            <h2 className="text-2xl">Other</h2>
            <div className="px-4 py-2">
              <p>SSN: {data.getAccountInfo.userDetail.govId}</p>
            </div>
          </div>
        </div>

        <div className="grow flex flex-col">
          <button 
            className='uppercase bg-gold text-black font-mono py-2 px-20 hover:bg-white border border-white hover:border-black'
            onClick = {() => {
                completeApplication();
                Router.push('/dash')
            }}
          >
              Complete Application
          </button>
        </div>
      </div>
    </DefaultBodyWrapper>
  )
}