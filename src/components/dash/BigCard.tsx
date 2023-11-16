import Link from "next/link";

export default function BigCard() {
  return (
    <div className='grow bg-white drop-shadow-lg px-2 py-1'>
      <div className='flex flex-col'>
        <h2 className='font-mono text-4xl mb-4'>
            Quick Links
        </h2>
        <p className='font-mono text-2xl'>
            Account Management
        </p>
        <p className='font-mono'>Change your password, update your address, view documents...</p>
        <hr className='my-2'/>
        <p className='font-mono text-2xl'>
            Support & Customer Service
        </p>
        <p className='font-mono'>Request a new card, chat with a support agent...</p>
        <hr className='my-2'/>
      </div>
    </div>
  )
}
