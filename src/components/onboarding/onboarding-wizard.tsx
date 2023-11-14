import React, { useContext, useState } from "react";
import { GET_ACCOUNT_INFO } from '@/graphql/queries/account';
import { useQuery } from '@apollo/client';
import EmailPassForm from "./steps/email-pass-form";
import ConfirmEmailForm from "./steps/confirm-email-form";
import ApplicationForm from "./steps/application-form";
import ReviewApplication from "./steps/review-application";
import Breadcrumb from "../breadcrumb";
import DefaultBodyWrapper from "../core/defaultBodyWrapper";

function getStepNumber(data: any) {
    if (!data || !data.getAccountInfo) {
        return 0
    } else if (data.getAccountInfo.status === "PREBOARDING") {
        return 1
    } else if (data.getAccountInfo.status === "ONBOARDING") {
        return 2
    }
    else return 3
}

export default function OnboardingWizard() {
    const breadcrumbSteps = ['Account', 'Verification', 'Application', 'Review'];
    const { loading: loading, error: error, data: data } = useQuery(GET_ACCOUNT_INFO);

    const startingStep = getStepNumber(data);

    const [activePageIndex, setActivePageIndex] = useState(startingStep);

    const goNextPage = () => {
        setActivePageIndex(index => index + 1);
    };
    
    const goPrevPage = () => {
      if (activePageIndex > 0) {
        setActivePageIndex(index => index - 1);
      }
    };

    const steps = [
        <EmailPassForm
            nextStep={goNextPage}
        />,
        <ConfirmEmailForm
            nextStep={goNextPage}
         />,
        <ApplicationForm
            nextStep={goNextPage}
        />,
        <ReviewApplication
            previousStep={goPrevPage}
        />
    ]
    const currentStep = steps[activePageIndex];

    if (loading) return null

    const ButtonPrev = () => (
      <button
        type="button"
        onClick={goPrevPage}
      >
        previous
      </button>
    )

    const ButtonNext = () =>
        activePageIndex < steps.length - 1 ? (
            <button
            // className="bg-red-500"
                type="button"
                onClick={goNextPage}
            >
                continue
            </button>
        ) : null;

    return <>
        <DefaultBodyWrapper>
          <div className="flex flex-col justify-center w-full">
            <div className="flex flex-col items-center">
                <h1 className="uppercase text-4xl lg:text-5xl xl:text-6xl font-bebas">{breadcrumbSteps[activePageIndex]}</h1>
            </div>
            <Breadcrumb steps={breadcrumbSteps} currentStep={activePageIndex} />
            
            {currentStep}
          </div>
        </DefaultBodyWrapper>
        {/* <ButtonPrev/>
        <ButtonNext/> */}
    </>
}

function dev_Navigator(stateIndex: number) {
  // const { devMode, setDevMode } = useContext(DevModeContext);

  return (
    <div className="flex flex-row">
      <div className="flex w-1/2 bg-red-500 justify-center">
        <button className="font-bold" onClick={goPrevPage}>PREVIOUS</button>
      </div>
      <div className="flex w-1/2 bg-green-500 justify-center">
        <button className="font-bold" onClick={goNextPage}>NEXT</button>
      </div>
    </div>
  )
}