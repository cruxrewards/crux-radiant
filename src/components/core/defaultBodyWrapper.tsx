// DefaultBodyWrapper
//
// Use this wrapper around your body for a default look. See pages/self/index.tsx for example.

export default function DefaultBodyWrapper({ children }: any) {
  return (
    <div className='grow flex'>
      <div className="flex container mx-auto">
        {children}
      </div>
    </div>
  )
}
