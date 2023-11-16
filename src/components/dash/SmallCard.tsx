import Link from "next/link";

export default function SmallCard() {
  return (
    <Link href='/self'>
    <div className='w-full aspect-square bg-gradient-to-br from-purple-500 to-pink-500 drop-shadow-lg hover:bg-none hover:bg-white px-1'>
        <p className='font-mono text-3xl'>Settings</p>
    </div>
    </Link>
  )
}
