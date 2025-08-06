"use client";
import ProfileContent from '@/components/Profile/ProfileContent/ProfileContent'
import SideBar from '@/components/Profile/SideBar/SideBar'
import { Bell, CalendarFold, CreditCard, Layers, LibraryBig, LogOut, Package, PictureInPicture, ShieldQuestionMark, ShoppingBasket, User, Video } from 'lucide-react';
import React, { useMemo, useState } from 'react'

export const items= [
  { id: 1, title: "Profile Settings", icon: <User />, route: "/profile-settings" },
  { id: 2, title: "Notifications", icon: <Bell />, route: "/notifications" },
  { id:3 , title:"All Courses" , icon : <LibraryBig /> , route : "/user-courses"},
  {id:4, title:"Videos" , icon : <Video /> , route: "/videos"},
  {id: 5 , title:"Lives" , icon : <PictureInPicture />, route:"/lives"},
  {id:6 , title:"Reservations" , icon:<CalendarFold /> , route:"/my-reservation"},
  {id:7 , title:"Orders" , icon : <Package /> , route:"/my-orders"},
  {id:8 , title:"My purchases" , icon : <ShoppingBasket /> , route:"/my-purchases"},
  {id: 9, title:"Logout" , icon : <LogOut /> , route:"/"}
];


export default function page() {
     const [activeRoute, setActiveRoute] = useState("/profile-settings");
  const activeItem = useMemo(() => items.find(i => i.route === activeRoute) || items[0], [activeRoute]);
  return (
    <div className='!m-10'>
        <div className="grid grid-cols-[2fr_6fr] gap-[20px]">
            <SideBar 
            items={items}
          activeRoute={activeRoute}
          onNavigate={(route) => setActiveRoute(route)}
            />
            <ProfileContent route={activeRoute} title={activeItem.title}/>
        </div>
    </div>
  )
}
