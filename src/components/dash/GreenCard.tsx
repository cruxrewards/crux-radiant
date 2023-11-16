import Link from "next/link";

export default function GreenCard() {
  return (
    <Link href='/dash/profile'>
    <div className='w-full aspect-square bg-gradient-to-br from-green-500 to-cyan-500 hover:bg-none hover:bg-white px-1'>
        <p className='font-mono text-3xl'>Link Bank Account</p>
    </div>
    </Link>
  )
}
