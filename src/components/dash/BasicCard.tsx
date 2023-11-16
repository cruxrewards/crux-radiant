import Link from "next/link";

export default function BasicCard() {
  return (
    <Link href='/tuition'>
    <div className='w-full aspect-[4/1] bg-gold hover:bg-white px-2 py-1 drop-shadow-lg ease-in-out duration-300'>
        <div className='flex flex-row'>
            <div className='flex flex-col w-3/4'>
                <h2 className='font-mono text-4xl'>
                    Duke University
                </h2>
                <p className='font-mono text-2xl'>
                    $10,234.95
                </p>
                <p className='font-mono'>Next payment due 5/6/2023</p>
            </div>
        </div>
    </div>
    </Link>
  )
}
