'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


export default function User(props:any) {
  return (
    <div className="flex justify-center">
      <div className="bg-green-950 rounded-2xl p-3 shadow-md border  m-2 mr-4 md:h-1/2 md:w-2/3 lg:h-1/3 lg:w-1/2">
        
          <div className="flex">
            <div className="h-10 w-16  lg:h-14 lg:w-14 rounded-full bg-slate-400"></div>
            <div className="ml-5">
              <h1 className="text-base font-semibold text-white">{props.name}</h1>
              <h1 className="text-base font-medium text-gray-400">@{props.username}</h1>
              <h1 className="text-base text-green-400 font-medium underline cursor-pointer hover:text-blue-500">
                {props.website}
              </h1>
              <h1 className="text-base text-white">{props.email}</h1>
              <h1 className="text-base text-white">{props.phone}</h1>
            </div>
            <div className="ml-20 lg:mt-4">
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
