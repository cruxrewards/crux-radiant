import React, { use, useEffect, useState } from 'react'
import { useRouter } from 'next/router';

import { GET_ACCOUNT_INFO } from '@/graphql/queries/account';
import { useMutation, useQuery } from '@apollo/client';
import ErrorScreen from '../red_full_screen';

interface HandleRouteProps {
    Component: any,
    pageProps: any
}

export default function HandleRoute({Component, pageProps}: HandleRouteProps) {
    const { loading, error, data } = useQuery(GET_ACCOUNT_INFO);
    const router = useRouter();
    console.log("in route handler", data)

    const routeRequiresAuthentication = router.pathname.startsWith("/dashboard") || router.pathname.startsWith("/onboarding");
    const routeRequiresOnboarding = router.pathname.startsWith("/onboarding");
    const routeRequiresUserDetails = router.pathname.startsWith("/onboarding/user-details");
 
    const [isAuthenticated, setIsAuthenticated] = useState( data && data.getAccountInfo && data.getAccountInfo.status === "ACTIVE");

    useEffect(() => {
        if (data && data.getAccountInfo) {
            console.log("routing")

            if (data.getAccountInfo.status === "ONBOARDING") {
                router.push("/onboarding");
            }
        }

        if (routeRequiresOnboarding) {
            if (data && data.getAccountInfo && data.getAccountInfo.status === "ACTIVE") {
                router.push("/dash")
            }
        }
    }, [loading])

    if (loading || routeRequiresUserDetails && (data && data.getAccountInfo !== "ONBOARDING")) {
        console.log(loading, )
        return null;
    } else {
        return <Component {...pageProps} />;
    }

    // useEffect(() => {
    //     if (data && data.getAccountInfo) {
    //         if (data.getAccountInfo.status === "ONBOARDING") {
    //             router.push("/onboarding/user-details");
    //         } else if (data.getAccountInfo.status === "ACTIVE") {
    //             console.log("Auehtnetication status", isAuthenticated);
    //             if (routeRequiresOnboarding) {
    //                 router.push("/dashboard")
    //             } else {
    //                 setIsAuthenticated(true);
    //             }
    //         } else {
    //             router.push("/");
    //         }
    //     }
    //     else if (!loading && ((routeRequiresAuthentication && !routeRequiresOnboarding)|| routeRequiresUserDetails)) {
    //         router.push("/");
    //     }
    // }, [loading, router.pathname, isAuthenticated, data])

    // if (routeRequiresAuthentication) {
    //     if (routeRequiresOnboarding && !loading && (!data|| !data.getAccountInfo)) {
    //         return <Component {...pageProps} />;
    //     }
    //     if (loading || !isAuthenticated) {
    //         return <ErrorScreen/>
    //     }
    //     return <Component {...pageProps} />;
    // }

    // return <Component {...pageProps} />;
}