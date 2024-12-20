'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


export default function User(props:any) {
  return (
    <div className="flex justify-center">
      <div className="bg-green-950 rounded-2xl p-3 shadow-md border  m-2 mr-4 md:h-1/2 md:w-2/3 lg:h-1/3 lg:w-1/2">
        
          <div className="flex">
            <div className="h-14 w-14  lg:h-14 lg:w-14 rounded-full bg-slate-400"></div>
            <div className="ml-5">
              <h1 className="text-base font-semibold text-white">{props.name}</h1>
              <h1 className="text-base font-medium text-gray-400">@{props.username}</h1>
              <h1 className="text-base text-green-400 font-medium underline cursor-pointer hover:text-blue-500">
                {props.website}
              </h1>
              <h1 className="text-base text-white">{props.email}</h1>
              <button className='flex mr-7 '>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-orange-400 hover:text-white">
              <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
              </svg>
              <h1 className="text-base text-white">{props.phone}</h1>
              </button>
            </div>
            <div className="ml-20 lg:mt-4 hidden lg:block md:block">
              <h1 className="text-base font-semibold text-white">Company: {props.company.name}</h1>
              <h1 className="text-white">{props.company.catchPhrase}</h1>
              <h1 className="text-white">
                {props.address.suite}, {props.address.street}, {props.address.city}
              </h1>
              <h1 className="text-white">{props.address.zipcode}</h1>
            </div>
          </div>
      
      </div>
    </div>
  );
}
