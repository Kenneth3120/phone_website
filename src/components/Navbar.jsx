import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap'; // Import GSAP
import { appleImg, bagImg, searchImg } from '../utils';
import { navLists } from '../constants';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Toggle sidebar visibility and animate with GSAP
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // GSAP Animation Effect
  useEffect(() => {
    if (isSidebarOpen) {
      gsap.to(sidebarRef.current, { x: 0, duration: 0.5, ease: "power3.out" });
    } else {
      gsap.to(sidebarRef.current, { x: '100%', duration: 0.5, ease: "power3.in" });
    }
  }, [isSidebarOpen]);

  return (
    <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
      <nav className="flex w-full items-center justify-between">
        {/* Left Section: Logo and Store Name */}
        <div className="flex items-center gap-5">
          <img src={appleImg} alt="Apple" width={24} height={24} />
          <h1 className='text-lg font-bold'>Junaid Store</h1>
        </div>

        {/* Center Section: Navigation Links (Visible only on larger screens) */}
        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((nav) => (
            <div key={nav} className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all">
              {nav}
            </div>
          ))}
        </div>

        {/* Right Section: Search, Bag, Login Button, and Hamburger */}
        <div className="flex items-center gap-7">
          {/* Search and Bag Icons */}
          <img src={searchImg} alt="search" width={18} height={18} />
          <img src={bagImg} alt="bag" width={18} height={18} />
          <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-all">
            Login
          </button>
          
          {/* Hamburger Button (Visible only on small devices) */}
          <button 
            className="sm:hidden block text-white" 
            onClick={toggleSidebar}
          >
            &#9776; {/* Hamburger icon */}
          </button>
        </div>
      </nav>

      {/* Sidebar for small devices */}
      <div
        ref={sidebarRef}
        className="fixed top-0 right-0 w-64 h-full bg-gray-900 text-white z-50 shadow-lg transition-transform transform translate-x-full"
        style={{ transform: isSidebarOpen ? 'translateX(0)' : 'translateX(100%)' }}
      >
        <div className="flex justify-between items-center px-5 py-4">
          <h2 className="text-lg font-bold">Menu</h2>
          {/* Close Button */}
          <button onClick={toggleSidebar} className="text-white text-xl">
            &times; {/* Close icon */}
          </button>
        </div>
        <div className="px-5 py-5">
          {navLists.map((nav) => (
            <div key={nav} className="py-2 text-sm cursor-pointer hover:text-gray-300 transition-all">
              {nav}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
