'use client';
import React, { useState, useEffect } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Link, Navigate, useNavigate } from 'react-router-dom';

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
    };
    company: {
      name: string;
      catchPhrase: string;
    };
  }
export default function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>();
    const API_BASE_URL = `https://jsonplaceholder.typicode.com/users`;
    
    const navigate = useNavigate();
    useEffect(() => {
      fetchUserDetails();
    }, []);


    useEffect(() => {
        // Redirect to the first user's details page once users are loaded
        if (users.length > 0 && !selectedUser) {
          const firstUser = users[0];  // Assuming we want to navigate to the first user
          setSelectedUser(firstUser);
          navigate(`/user/${firstUser.id}`);
        }
      }, [users, navigate, selectedUser]);

    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE_URL}`);
        
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data: User[] = await response.json();
        setUsers(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
  
    if (loading) {
      return (
        <div className="flex justify-center items-center min-h-[200px]">
          Loading...
        </div>
      );
    }
    const handleUserSelect = (user: User) => {
        setSelectedUser(user);
        navigate(`/User/${user.id}`); // Navigate to the user's detail page using their ID
      };
  return (
    <Menu as="div" className="relative inline-block text-left md:mr-36 lg:mr-20">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1 rounded-md bg-white hover:bg-blue-100 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
          
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
             <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>

          
        </MenuButton>
      </div>

      <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5">
        <div className="py-1">
          {users.map((user) => (
            <MenuItem key={user.id}>
              <Link
                to={`/user/${user.id}`} // Navigate to the user details page with their ID
                className="block px-4 py-2 text-sm text-gray-700"
                onClick={() => handleUserSelect(user)}
              >
                {user.name}
              </Link>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  )
}
