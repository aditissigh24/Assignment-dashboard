
'use client';
import User from "./Components/UserProfile";
import UserAcitivityGrid from "./Components/UserAcitivityGrid";
import Users from "./Components/Users";
import UserDetails from "./Components/UserDetails";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function Home() {
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
