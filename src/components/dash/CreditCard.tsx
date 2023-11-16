import Link from "next/link";

export default function CreditCard() {
  return (
    <Link href='/card'>
    <div className='w-full aspect-[4/1] bg-gold hover:bg-white px-2 py-1 drop-shadow-lg ease-in-out duration-300'>
        <div className='flex flex-row'>
            <div className='flex flex-col w-3/4'>
                <h2 className='font-mono text-4xl'>
                    Crux Credit Card
                </h2>
                <p className='font-mono text-2xl'>
                    $378.65
                </p>
                <p className='font-mono'>Next payment due 4/17/2023</p>
            </div>
        </div>
    </div>
    </Link> 
  )
}
