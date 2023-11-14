import Social from "../social";

export default function Footer() {
  return (
    <div className="w-full md:h-auto bg-black">
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto py-8 px-4 space-y-6 md:space-y-0">
        <div className="w-full md:w-1/3 space-y-2">
          <Social />
          <p className="font-mono text-white text-sm">2023 - Crux Rewards</p>
        </div>
        <div className="w-full md:w-1/3 space-y-2">
          <p className="font-mono text-white text-sm hover:underline">Terms & Conditions</p>
          <p className="font-mono text-white text-sm hover:underline">Privacy Policy</p> 
          <p className="font-mono text-white text-sm hover:underline">Help & Support</p>
        </div>
        <div className="w-full md:w-1/3 space-y-2">
          <p className="font-mono text-white text-sm hover:underline">Contact Us</p>
          <p className="font-mono text-white text-sm hover:underline">About</p> 
          {/* <p className="font-mono text-white text-sm hover:underline">Careers</p> */}
        </div>
      </div>
    </div>
  )
}
