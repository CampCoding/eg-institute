"use client";
import { Home } from 'lucide-react'
import React from 'react'
import ProfileSettingForm from '../ProfileSettingForm/ProfileSettingForm';
import Notification from '../Notification/Notification';
import ProfileCourses from '../ProfileCourses/ProfileCourses';
import ProfileVideos from '../ProfileVideos/ProfileVideos';
import ProfileLives from '../ProfileLives/ProfileLives';
import ProfileReservation from '../ProfileReservation/ProfileReservation';
import ProfileOrders from '../ProfileOrders/ProfileOrders';
import ProfilePurchases from '../ProfilePurchases/ProfilePurchases';
import Schedule from '../Schedule/Schedule';

export default function ProfileContent({ route, title }) {
  return (
    <div className='bg-white rounded-2xl h-full shadow-xl ring-1 ring-black/5 overflow-hidden'>
       
        {route === "/profile-settings" && <ProfileSettingForm/>}
        {route == "/notifications" && <Notification />}
        {route == "/user-courses" && <ProfileCourses />}
        {route == "/schedule" && <Schedule />}
        {route == "/videos" && <ProfileVideos />}
        {route == "/lives" && <ProfileLives />}
        {route == "/my-reservation" && <ProfileReservation />}
        {route =="/my-orders"  && <ProfileOrders />}
        {route =="/my-purchases"  && <ProfilePurchases />}
    </div>
  )
}
