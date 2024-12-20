
'use client';
import User from "./Components/UserProfile";
import UserAcitivityGrid from "./Components/UserAcitivityGrid";
const Users = dynamic(() => import('./Components/Users'), { ssr: false });
const UserDetails = dynamic(() => import('./Components/UserDetails'), { ssr: false });
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This will ensure that we are only rendering on the client
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Render nothing during SSR
  }

  
  return (
    <Router>
      <div className="flex justify-between lg:justify-around  mt-6 p-2">
        <h1 className="text-2xl md:ml-32 lg:ml-20 font-semibold ">Dashboard</h1> 
        <Users/>
    </div>
      <div>
        <Routes>
        <Route path="/user/:userId" element={<UserDetails />} />
        </Routes>
      </div>
   
   </Router>
  );
}
