import Link from "next/link";

export default function BlueCard() {
  return (
    <Link href='/dash/profile'>
      <div className='w-full aspect-square bg-gradient-to-br from-cyan-500 to-blue-500 hover:bg-none hover:bg-white px-1'>
          <p className='font-mono text-3xl'>Profile</p>
      </div>
    </Link>
  )
}
