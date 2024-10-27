import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useClerk, useUser } from '@clerk/clerk-react'; // Import useClerk and useUser
import { gsap } from 'gsap';
import { appleImg, bagImg, searchImg } from '../utils';
import { navLists } from '../constants';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const { openSignIn, signOut } = useClerk(); // Get signOut to handle user logout
  const { isSignedIn, user } = useUser(); // Destructure isSignedIn and user from useUser

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (isSidebarOpen) {
      gsap.to(sidebarRef.current, { x: 0, duration: 0.5, ease: 'power3.out' });
    } else {
      gsap.to(sidebarRef.current, { x: '100%', duration: 0.5, ease: 'power3.in' });
    }
  }, [isSidebarOpen]);

  const handleLogin = () => {
    openSignIn(); // Trigger the Clerk sign-in popup when the login button is clicked
  };

  const handleLogout = () => {
    signOut(); // Sign the user out
  };

  return (
    <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
      <nav className="flex w-full items-center justify-between">
        {/* Left Section: Logo and Store Name */}
        <div className="flex items-center gap-5">
          <Link to="/">
            <img src={appleImg} alt="Apple" width={24} height={24} />
            <h1 className="text-lg font-bold">Junaid Store</h1>
          </Link>
        </div>

        {/* Center Section: Navigation Links */}
        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((nav) => (
            <div key={nav} className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all">
              {nav}
            </div>
          ))}
        </div>

        {/* Right Section: Login/Logout, Profile, Search, and Cart */}
        <div className="flex items-center gap-7">
          <img src={searchImg} alt="search" width={18} height={18} />
          <img src={bagImg} alt="bag" width={18} height={18} />

          {isSignedIn ? (
            // Show user profile if signed in
            <div className="flex items-center gap-3">
              <img
                src={user.profileImageUrl} // Use the user's profile image
                alt={user.fullName || 'User'} // Fallback text if the full name is not available
                className="w-8 h-8 rounded-full"
              />
              <span className="text-white">{user.fullName || user.username}</span>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            // Show login button if not signed in
            <button
              className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-all"
              onClick={handleLogin}
            >
              Login
            </button>
          )}

          <button 
            className="sm:hidden block text-white"
            onClick={toggleSidebar}
          >
            &#9776;
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className="fixed top-0 right-0 w-64 h-full bg-gray-900 text-white z-50 shadow-lg transition-transform transform translate-x-full"
      >
        <div className="flex justify-between items-center px-5 py-4">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={toggleSidebar} className="text-white text-xl">
            &times;
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
