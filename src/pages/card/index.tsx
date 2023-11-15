import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { GET_ACCOUNT_INFO, GET_CREDIT_INFO } from '@/graphql/queries/account';
import { FormControlLabel, Switch } from '@mui/material';


export default function Card() {
  const { loading: queryLoading, error: queryError, data: queryData } = useQuery(GET_ACCOUNT_INFO);
  const { loading: creditLoading, error: creditError, data: creditData } = useQuery(GET_CREDIT_INFO);

  return (
    <div className="grow bg-white" style={{ display: 'flex' }}>
      <div style={{ marginLeft: '20px', marginTop: '20px' }}>
        {creditData && creditData.getCreditInfo && queryData &&
          <div>
            <VirtualCard
              pan={creditData.getCreditInfo.pan}
              cvv={creditData.getCreditInfo.cvv}
              expirationDate={creditData.getCreditInfo.expirationDate}
              cardholderName={queryData.getAccountInfo.userDetail.firstName}
            />
            <FormControlLabel control={<Switch />} label="Lock Card" />
          </div>
        }
      </div>

      <div style={{ marginLeft: '20px', marginRight: '20px', marginTop: '20px' }}>
        <div style={{ width: '300px', border: '2px solid #8e44ad', borderRadius: '15px', padding: '20px', marginBottom: '20px' }}>
          <h2 style={{ fontWeight: 'bold', fontSize: '1.5em', color: '#8e44ad', marginBottom: '10px' }}>Rewards Points</h2>
          <div style={{ marginBottom: '20px' }}>
            <p><strong>{queryData.getAccountInfo.userDetail.firstName}:</strong> 30 points</p>
          </div>
        </div>

        <div style={{ width: '300px', border: '2px solid #3498db', borderRadius: '15px', padding: '20px' }}>
          <h2 style={{ fontWeight: 'bold', fontSize: '1.5em', color: '#3498db', marginBottom: '10px' }}>Transaction History</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>2023-01-15 - Purchase at Store A (-$25.0)</li>
            <li>2023-01-18 - Cashback Reward (+$100.0)</li>
            {/* Add more transaction history items as needed */}
          </ul>
        </div>
      </div>
    </div>
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