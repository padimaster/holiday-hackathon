import React from "react";
import {
  Home,
  Search,
  Bell,
  Mail,
  Bookmark,
  Users,
  User,
  MoreHorizontal,
} from "lucide-react";
import Image from "next/image";

const Sidebar = () => {
  const menuItems = [
    { icon: <Home size={24} />, label: "Home" },
    { icon: <Search size={24} />, label: "Explore" },
    { icon: <Bell size={24} />, label: "Notifications" },
    { icon: <Mail size={24} />, label: "Messages" },
    { icon: <Bookmark size={24} />, label: "Bookmarks" },
    { icon: <Users size={24} />, label: "Communities" },
    { icon: <User size={24} />, label: "Profile" },
    { icon: <MoreHorizontal size={24} />, label: "More" },
  ];

  return (
    <div className="w-64 h-screen bg-black text-white p-4 flex flex-col">
      {/* Menu Items */}
      <nav className="flex-1">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 p-3 hover:bg-gray-900 rounded-full cursor-pointer"
          >
            {item.icon}
            <span className="text-xl">{item.label}</span>
          </div>
        ))}
      </nav>

      {/* Post Button */}
      <button className="w-full bg-blue-500 text-white rounded-full py-3 font-bold hover:bg-blue-600">
        Post
      </button>

      {/* Profile Section */}
      <div className="mt-4 flex items-center space-x-3 p-3 hover:bg-gray-900 rounded-full cursor-pointer">
        <Image
          src="/api/placeholder/40/40"
          alt="Profile"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex flex-col">
          <span className="font-bold">Alex Padilla</span>
          <span className="text-gray-500">@padimaster</span>
        </div>
        <MoreHorizontal size={20} className="ml-auto" />
      </div>
    </div>
  );
};

export default Sidebar;
