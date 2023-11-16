import React from "react";
import Layout from '@/components/core/layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Space_Mono, Barlow_Condensed, Roboto_Condensed, Roboto_Mono, Bebas_Neue } from 'next/font/google'
import { GET_ACCOUNT_INFO } from '@/graphql/queries/account'

import { ApolloProvider } from "@apollo/client";
import client from "../../apollo-client"
import { useQuery } from "@apollo/client";

import HandleRoute from "@/components/handle_route";
import '../styles.css'

const barlow_condensed = Barlow_Condensed({
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--font-barlow-condensed',
})

// const space_mono = Space_Mono({
//   weight: ['400', '700'],
//   subsets: ['latin'],
//   variable: '--font-space-mono',
// })

const roboto_condensed = Roboto_Condensed({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-roboto-condensed',
})

const roboto_mono = Roboto_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-roboto-mono',
})

const bebas_neue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
})

export default function RootContextProvider(props: AppProps) {
  return (
    <ApolloProvider client={client}>
          <App {...props} />
    </ApolloProvider>
  )
}

function App({ Component, pageProps }: AppProps) {
  const { loading: queryLoading, error: queryError, data: queryData, refetch } = useQuery(GET_ACCOUNT_INFO);

  // ${space_mono.variable}
  return (
    <main className={`${barlow_condensed.variable} ${roboto_condensed.variable} ${roboto_mono.variable} ${bebas_neue.variable}`}>
      <Layout>
        <HandleRoute
          Component={Component}
          pageProps={pageProps}
        />
      </Layout>
    </main>
  )
}