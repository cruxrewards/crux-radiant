import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { GET_ACCOUNT_INFO, GET_CREDIT_INFO } from '@/graphql/queries/account';
import { FormControlLabel, Switch } from '@mui/material';
import Image from 'next/image'
import card_svg from '../../../public/empty_card.svg'
import Link from 'next/link';

const small_buttons = [
  {name: 'Payment Due Feb 15', href: '#'},
  {name: 'Details', href: '#'},
  {name: 'Security', href: '#'},
  {name: 'Support', href: '#'},
  {name: 'Virtual Card', href: '#'},
  {name: 'Referrals', href: '#'},
]

const transactions = [
  {name: 'Starbucks', desc: 'Restuarant', icon: 'starbucks.com', amount: 12.34},
  {name: 'Apple', desc: 'Technology', icon: 'apple.com', amount: 999.99},
  {name: 'Duke University', desc: 'University', icon: 'duke.edu', amount: 9876.54},
  {name: 'Chick-fil-A', desc: 'Restuarant', icon: 'chick-fil-a.com', amount: 10.99},
  {name: 'evo.com', desc: 'Sports', icon: 'evo.com', amount: 600.00},
  {name: 'In-N-Out', desc: 'Restuarant', icon: 'in-n-out.com', amount: 8.73},
  {name: 'Costco', desc: 'Wholesale', icon: 'costco.com', amount: 57.21},
]


export default function Card() {
  const { loading: queryLoading, error: queryError, data: queryData } = useQuery(GET_ACCOUNT_INFO);
  const { loading: creditLoading, error: creditError, data: creditData } = useQuery(GET_CREDIT_INFO);

  return (
    <div className='grow flex flex-col bg-white'>
      <div className='w-full h-60 gradient-background'>
        <div className='flex flex-row h-full container mx-auto'>
          <div className='w-2/3 flex flex-col h-full items-center justify-center'>
            <Image 
              src={card_svg}
              height={192}
              alt="default card"
              className='drop-shadow-lg'
            />
          </div>
          <div className='flex flex-col w-1/3 h-full p-4 justify-center space-y-2 text-white font-mono'>
            <div>
              <p className=''>Current Balance</p>
              <p className='text-5xl'>
                <span className='text-3xl'>$</span>
                1234.56
              </p>
            </div>
            <div>
              <p className=''>Available Credit</p>
              <p className='text-2xl'>
              <span className='text-base'>$</span>
                1234.56
              </p>
            </div>
            <div>
              <p className=''>Reward Points</p>
              <p className='text-2xl'>123456</p>
            </div>
          </div>
        </div>
      </div>

      <div className='grow flex flex-col container mx-auto'>
        <div className='flex h-32 w-full p-4 space-x-4 flex-wrap'>
          {small_buttons.map((item) => (
            <div className='flex flex-col h-10 px-10 justify-center rounded-full bg-custom_gold border border-black hover:bg-black hover:text-white'>
              <Link href={item.href} className='text-center whitespace-nowrap font-mono'>
                {item.name}
              </Link>
            </div>
          ))}
        </div>

        <div className='grow flex flex-col w-full divide-y divide-black'>
          <h2 className='py-2 px-4 text-3xl'>Transactions</h2>
          <div className='grow flex flex-col py-2 divide-y divide-gray-300'>
            {transactions.map((item) => (
              <div className='flex flex-row h-20 w-full px-10 py-2 space-x-8'>
                <div className='aspect-square h-full rounded-full overflow-hidden border border-gray-300'>
                  <img src={'https://logo.clearbit.com/' + item.icon}/>
                </div>

                <div className='grow flex flex-col my-auto'>
                  <p className='text-sm'>{item.desc}</p>
                  <p className='text-xl'>{item.name}</p>
                </div>

                <div className='my-auto'>
                  <p className='text-2xl'>${item.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>

    // <div className="grow gradient-background" style={{ display: 'flex' }}>
    //   <div style={{ marginLeft: '20px', marginTop: '20px' }}>
    //     {creditData && creditData.getCreditInfo && queryData &&
    //       <div>
    //         <VirtualCard
    //           pan={creditData.getCreditInfo.pan}
    //           cvv={creditData.getCreditInfo.cvv}
    //           expirationDate={creditData.getCreditInfo.expirationDate}
    //           cardholderName={queryData.getAccountInfo.userDetail.firstName}
    //         />
    //         <FormControlLabel control={<Switch />} label="Lock Card" />
    //       </div>
    //     }
    //   </div>

    //   <div style={{ marginLeft: '20px', marginRight: '20px', marginTop: '20px' }}>
    //     <div style={{ width: '300px', border: '2px solid #8e44ad', borderRadius: '15px', padding: '20px', marginBottom: '20px' }}>
    //       <h2 style={{ fontWeight: 'bold', fontSize: '1.5em', color: '#8e44ad', marginBottom: '10px' }}>Rewards Points</h2>
    //       <div style={{ marginBottom: '20px' }}>
    //         <p><strong>{queryData.getAccountInfo.userDetail.firstName}:</strong> 30 points</p>
    //       </div>
    //     </div>

    //     <div style={{ width: '300px', border: '2px solid #3498db', borderRadius: '15px', padding: '20px' }}>
    //       <h2 style={{ fontWeight: 'bold', fontSize: '1.5em', color: '#3498db', marginBottom: '10px' }}>Transaction History</h2>
    //       <ul style={{ listStyle: 'none', padding: 0 }}>
    //         <li>2023-01-15 - Purchase at Store A (-$25.0)</li>
    //         <li>2023-01-18 - Cashback Reward (+$100.0)</li>
    //         {/* Add more transaction history items as needed */}
    //       </ul>
    //     </div>
    //   </div>
    // </div>
  );
}

interface VirtualCardProps {
  pan: string;
  expirationDate: string;
  cardholderName: string;
  cvv: string;
}


function VirtualCard(props: VirtualCardProps) {
  return (
    <div
      style={{
        width: '400px',
        height: '250px',
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '20px',
        border: '2px solid #8e44ad', // Purple border color
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        color: '#8e44ad', // Purple text color
      }}
    >
      <div>
        <h2 style={{ marginBottom: '10px', fontSize: '1em' }}>Cardholder Name</h2>
        <p style={{ fontSize: '0.8em', marginBottom: '15px' }}>{props.cardholderName}</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '0.9em' }}>Card Number</h3>
          <p style={{ fontSize: '0.8em' }}>{props.pan}</p>
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: '0.9em' }}>Expires</h3>
          <p style={{ fontSize: '0.8em' }}>{props.expirationDate}</p>
        </div>
      </div>
      <div>
        <h3 style={{ margin: 0, fontSize: '0.9em' }}>CVV</h3>
        <p style={{ fontSize: '0.8em', letterSpacing: '4px' }}>{props.cvv}</p>
      </div>
    </div>
  );
}