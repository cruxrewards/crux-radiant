import React, { useEffect } from "react";
import Router from "next/router";
import { GET_ACCOUNT_INFO } from "@/graphql/queries/account";
import { useQuery } from "@apollo/client";

import BasicCard from "@/components/dash/BasicCard";
import BigCard from "@/components/dash/BigCard";
import BlueCard from "@/components/dash/BlueCard";
import CreditCard from "@/components/dash/CreditCard";
import GreenCard from "@/components/dash/GreenCard";
import RewardsCard from "@/components/dash/RewardsCard";
import SmallCard from "@/components/dash/SmallCard";
import Image from "next/image";

export default function Dashboard() {
  const { loading: queryLoading, error: queryError, data: queryData } = useQuery(GET_ACCOUNT_INFO);

  return (
    <div className='grow relative'>
      <Image 
        className="object-cover object-top"
        src="/north-cascades.jpg"
        alt="North Casdades"
        fill
      />
      
      <div className='container mx-auto relative'>
        
        <div className='flex justify-center'>
          <p className='uppercase font-condensed text-4xl text-white'>
            Good Evening {queryData.getAccountInfo.email}
          </p>
          <div className='h-[200px]'></div>
        </div>

        <div className='flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0'>
          <div className='flex flex-col w-full md:w-1/2 space-y-4'>
            <BasicCard />
            <CreditCard />
            <div className='flex flex-row space-x-4'>
              <div className='w-1/3'>
                <GreenCard />
              </div>
              <div className='w-1/3'>
                <BlueCard />
              </div>
              <div className='w-1/3'>
                <SmallCard />
              </div>
            </div>
          </div>
          <div className='flex flex-col w-full md:w-1/2 space-y-4'>
            <RewardsCard />
            <BigCard />
          </div>
        </div>

      </div>
    </div>
  )
}

