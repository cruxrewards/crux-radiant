import React, { useState } from "react";
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
        setActivePageIndex(index => index - 1);
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

    const ButtonPrev = () =>
        activePageIndex > 0 ? (
            <button
                type="button"
                onClick={goPrevPage}
            >
                previous
            </button>
        ) : null;
    const ButtonNext = () =>
        activePageIndex < steps.length - 1 ? (
            <button
                type="button"
                onClick={goNextPage}
            >
                continue
            </button>
        ) : null;

    return <>
        <DefaultBodyWrapper>
            <div className="flex flex-col items-center">
                <h1 className="uppercase text-6xl lg:text-7xl xl:text-8xl font-bebas">{breadcrumbSteps[activePageIndex]}</h1>
            </div>
            <Breadcrumb steps={breadcrumbSteps} currentStep={activePageIndex} /> 
            {currentStep}
        </DefaultBodyWrapper>
        {/* <ButtonPrev/>
        <ButtonNext/> */}
    </>
}