import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { SocialIcon } from "react-social-icons"

export default function Home() {
  const [email, setEmail] = useState('')
  const [showWaitlist, setShowWaitlist] = useState(true)

  // const handleSubmit = () => {
  //   console.log("hi");
  // }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = {
      email,
    }

    setShowWaitlist(false)
    setEmail('')
    
    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })

    // const content = await response.json();
    // alert(content.data.tableRange)
  }

  return (
    <>
    <Head>
      <title>Crux Rewards | Earn Points on Tuition</title>
      <meta name="description" content="Crux is the first loyalty rewards platform and credit card to give you points back on tuition." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    
    <div className="bg-white">
        <div className="flex flex-col relative isolate px-6 pt-14 lg:px-8 min-h-screen overflow-hidden">
          <div
            className="absolute inset-x-0 -top-40 z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }} />
          </div>
          <div className="grow flex flex-col-reverse sm:flex-row mx-auto max-w-7xl items-center py-6">
            <div className='w-full sm:w-1/2 z-50'>
              <h1 className='text-6xl lg:text-7xl xl:text-8xl font-condensed text-gray-700'>
                pay tuition.<br />
                earn <span className='text-transparent bg-clip-text bg-gradient-to-r from-custom_purple to-custom_gold'>rewards.</span><br />
                repeat.
              </h1>
              <p className='font-mono text-gray-700 py-6'>
                Crux is the first loyalty rewards platform and credit card to give you points back on tuition - join our waitlist to stay updated!
              </p>
              <button onClick={handleSubmit}>
                <div className='flex flex-col md:flex-row gap-2'>
                    <> 
                      <Link 
                        className='uppercase border border-gray-700 hover:bg-gray-700 text-gray-700 hover:text-white font-mono py-2 px-10'
                        href="/onboarding"
                      >
                        APPLY NOW
                      </Link>
                    </>
                </div>
              </button>
            </div>
            <div className='-z-100 relative w-full sm:w-1/2'>
              <video className='-z-100' autoPlay muted playsInline src="/cardv6.webm" />
            </div>
          </div>

          {/* <div className='w-full max-w-7xl h-24 mx-auto z-50'>
            <div className='flex flex-row gap-x-2 w-full'>
              <SocialIcon url="https://www.instagram.com/cruxrewards/" className="rounded-full hover:bg-black" target="_blank" />
              <SocialIcon url="https://twitter.com/cruxrewards" className="rounded-full hover:bg-black" target="_blank" />
              <SocialIcon url="https://www.linkedin.com/company/cruxrewards/" className="rounded-full hover:bg-black" target="_blank" />
            </div>
          </div> */}

          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }} />
          </div>
        </div>


        <div className='bg-custom_gold p-8'>
          <div className='container flex flex-col max-w-4xl mx-auto justify-center items-center'>
            <h1 className='uppercase font-condensed font-bold text-4xl sm:text-7xl text-black'>
              Join the waitlist
            </h1>
            <p className='font-mono text-md text-black'>
              Be the first to hear about exclusive offers and updates from Crux.
            </p>
            <div className='w-full'>
            <form onSubmit={handleSubmit}>
                    <div className='flex flex-col md:flex-row gap-2'>
                      {showWaitlist && (
                        <>
                          <input className='grow border border-gray-700 py-2 px-3 text-gray-700 font-mono' value={email} onChange={e => setEmail(e.target.value)} id="email" type="text" placeholder="Enter your email" />
                          <button className='uppercase border border-gray-700 hover:bg-gray-700 text-gray-700 hover:text-white font-mono py-2 px-10' type='submit'>
                            Sign up
                          </button>
                        </>
                      )}
                      {!showWaitlist && (
                        <p className='text-gray-700 font-mono'>Thank you for your interest!</p>
                      )}
                    </div>
                  </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
