import router from "next/router";
import { useMutation, useQuery } from '@apollo/client'
import { GET_ACCOUNT_INFO } from '@/graphql/queries/account'
import { SIGNOUT_USER } from '@/graphql/mutations/authentication'
import Link from 'next/link'
import { BellIcon, Cog8ToothIcon, LinkIcon, DocumentIcon, ChatBubbleLeftRightIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'


const sections = [
  { header: 'Profile', links: [
    { name: 'Activity', icon: BellIcon, href: '#'},
    { name: 'Settings', icon: Cog8ToothIcon, href: '/self/settings'},
    { name: 'Linked Accounts', icon: LinkIcon, href: '/dashboard/profile'},
    { name: 'Documents', icon: DocumentIcon, href: '#'},
  ]},
  { header: 'Support', links: [
    { name: 'Contact Us', icon: ChatBubbleLeftRightIcon, href: '#'},
  ]},
  { header: 'Other', links: [
    { name: 'Sign Out', icon: ArrowLeftOnRectangleIcon, href: '#'},
  ]}
]

export default function Self() {
  const { loading: queryLoading, error: queryError, data: queryData, refetch } = useQuery(GET_ACCOUNT_INFO);

  const [signoutUser, { data, loading, error }] = useMutation(SIGNOUT_USER, {
    refetchQueries: [
      GET_ACCOUNT_INFO
    ],
  });

  async function logout() {
    router.push('/');
    const response = await signoutUser();
    await refetch();
    localStorage.removeItem("auth_token");
  }

  return (
    <div className="grow flex">
      <div className="flex container mx-auto">
        <div className="w-1/3 p-6">
          <h1 className="text-right uppercase text-6xl">Good<br />evening<br />Brandon</h1>
        </div>

        <div className="w-2/3 p-6 divide-y space-y-6 divide-black">
          {sections.map((item) => (
            <div className="flex flex-col space-y-2">
              <h2 className="">{item.header}</h2>
              {item.links.map((subitem) => (
                <Link href={subitem.href}>
                  <div className="flex flex-row items-center max-w-fit p-2 hover:bg-red-100 space-x-2">
                    <subitem.icon className="h-4 w-4" />
                    <p>{subitem.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
