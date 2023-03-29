import Footer from "./footer";
import Navbar from "./navbar";

export default function Layout({ children }) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
