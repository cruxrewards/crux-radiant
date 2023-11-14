import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { useMutation, useQuery } from '@apollo/client'
import { GET_ACCOUNT_INFO } from '@/graphql/queries/account'
import { SIGNOUT_USER } from '@/graphql/mutations/authentication'
import client from '../../../apollo-client'
import logo from '../../../public/orig_color.svg'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Card', href: '/card' },
  { name: 'Tuition', href: '/tuition' },
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const { loading: queryLoading, error: queryError, data: queryData, refetch } = useQuery(GET_ACCOUNT_INFO);
  const [signoutUser, { data, loading, error }] = useMutation(SIGNOUT_USER, {
    refetchQueries: [
      GET_ACCOUNT_INFO
    ],
  });

  const router = useRouter();
  const loggedIn = true;
  // const loggedIn = queryData !== undefined && queryData.getAccountInfo !== null;

  async function logout() {
    router.push('/');
    const response = await signoutUser();
    await refetch();
    localStorage.removeItem("auth_token");
  }

  console.log("queryData", queryData)

  return (
    <Disclosure as="nav" className="bg-black">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-20 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Image
                    src={logo}
                    alt="Crux Logo"
                    height={32} 
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={
                          'uppercase px-3 py-2 text-sm font-medium font-mono ' +
                          (router.pathname == item.href 
                            ? 'underline text-gold'
                            : 'text-gray-300 hover:underline hover:text-white')
                        }
                        // aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              { loggedIn && 
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Link
                  key="profile"
                  href={"/self"}
                  className={
                    'uppercase px-3 py-2 text-sm font-medium font-mono ' +
                    (router.pathname == "/dashboard/profile"
                      ? 'underline text-gold'
                      : 'text-gray-300 hover:underline hover:text-white')
                  }
                  // aria-current={item.current ? 'page' : undefined}
                >
                  xx {queryData && queryData.getAccountInfo && queryData.getAccountInfo.userDetail.firstName}
                </Link>
                {/* <button
                  type="button"
                  className="rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}

                {/* Profile dropdown */}
                {/* <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/dashboard/profile"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </Link>
                        )}
                      </Menu.Item>
                      {loggedIn && <Menu.Item>
                        {({ active }) => (
                          <button onClick={logout} className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          > 
                            Sign Out
                          </button>
                        )}
                      </Menu.Item>}
                    </Menu.Items>
                  </Transition>
                </Menu> */}
              </div>}
              {!loggedIn &&
                <div className="lg:flex lg:flex-1 lg:justify-end pl-6">
                  <Link href="/onboarding/login" className="uppercase text-sm font-mono py-2 px-4 leading-6 text-white hover:text-black ring-1 ring-white hover:bg-white">
                      Log in <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>}
              {/* <div className="lg:flex lg:flex-1 lg:justify-end pl-6">
                <Link href="/waitlist" className="uppercase text-sm font-mono py-2 px-4 leading-6 text-white hover:text-black ring-1 ring-white hover:bg-white">
                    Join the waitlist
                </Link>
              </div> */}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={
                    'block uppercase px-3 py-2 text-sm font-medium font-mono ' +
                    (router.pathname == item.href 
                      ? 'underline text-gold'
                      : 'text-gray-300 hover:underline hover:text-white')
                  }
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
