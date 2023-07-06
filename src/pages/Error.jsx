
const Error = () => {
  return (
    <div className="bg-richblack-900 h-[calc(100vh-3.5rem)]">
        <nav className="shelf">
            <a className="book home-page" href="/">Home page</a>
            <a className="book about-us" href="/about">About us</a>
            <a className="book contact" href="/contact">Contact</a>
            
            <span className="book not-found"></span>
            
            <span className="door left"></span>
            <span className="door right"></span>
        </nav>
        <h1 className="text-center mt-8 text-4xl text-richblack-25 font-bold font-dancing-script">Error 404</h1>
        <p className="text-center text-2xl font-medium text-richblack-25 font-dancing-script">The page you're loking for can't be found</p>

    </div>
  )
}

export default Error