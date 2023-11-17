import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { COMPLETE_BANK_VERIFICATION } from '@/graphql/mutations/external_bank_account';
import { GET_LINK_TOKEN, GET_PLAID_BANK_ACCOUNTS } from '@/graphql/queries/external_bank_account';
import Router from 'next/router';
import {
    usePlaidLink,
    PlaidLinkOptions,
    PlaidLinkOnSuccess,
} from 'react-plaid-link';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

export default function Profile() {
    const { loading: queryLoading, error: queryError, data: queryData } = useQuery(GET_LINK_TOKEN);
    const { loading: bankLoading, error: bankError, data: bankData } = useQuery(GET_PLAID_BANK_ACCOUNTS);
    const linkToken = queryData && queryData.getLinkToken && queryData.getLinkToken.linkToken;
  
    const plaidAccounts = bankData ? bankData.getPlaidBankAccounts : [];
  
    const account_tiles = plaidAccounts.map((account: any, index: number) => (
      <ListItem key={index} disablePadding>
        <ListItemText sx={{ color: 'black' }} primary={`Checking ****${account.mask}`} />
      </ListItem>
    ));
  
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'black', color: 'white' }}>
        {plaidAccounts && (
          <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', marginTop: 4 }}>
            <List>
              {account_tiles}
            </List>
          </Box>
        )}
        <BankAuthentication linkToken={linkToken} />
      </Box>
    );
  }
  
  interface LinkProps {
    linkToken: string | null;
  }
  
  function BankAuthentication(props: LinkProps) {
    const [completeBankVerification, { data, loading, error }] = useMutation(COMPLETE_BANK_VERIFICATION);
  
    function handleSuccess(publicToken: string, metadata: any) {
      completeBankVerification({ variables: { publicToken: publicToken, metadata: metadata } });
    }
  
    const config: PlaidLinkOptions = {
      onSuccess: (publicToken, metadata) => { handleSuccess(publicToken, metadata); },
      token: props.linkToken,
    };
  
    const { open, ready } = usePlaidLink(config);
  
    return (
      <Button
        variant="contained"
        sx={{ marginTop: 2, backgroundColor: '#FFD700', color: 'black', '&:hover': { backgroundColor: 'white', color: 'black' } }}
        onClick={() => open()}
        disabled={!ready}
      >
        Link Account
      </Button>
    );
  }