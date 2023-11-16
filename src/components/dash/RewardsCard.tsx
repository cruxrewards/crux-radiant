import Link from "next/link";

export default function RewardsCard() {
  return (
    <Link href='/card'>
    <div className='group w-full aspect-[4/1] bg-black hover:bg-white hover:text-black px-2 py-1 drop-shadow-lg'>
        <div className='flex flex-row'>
            <div className='flex flex-col w-3/4'>
                <h2 className='font-mono text-white group-hover:text-black text-4xl'>
                    Rewards
                </h2>
                <p className='font-mono text-white group-hover:text-black text-2xl'>
                    43,971 Crux Rewards Points
                </p>
            </div>
        </div>
    </div>
    </Link>
  )
}
