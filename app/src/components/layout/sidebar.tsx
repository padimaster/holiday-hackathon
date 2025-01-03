'use client'
import React, { useState } from "react";
import {
  Home,
  Search,
  Bell,
  Mail,
  Bookmark,
  Users,
  User,
  MoreHorizontal,
  X,
  Image as ImageIcon,
  Gift,
  ListFilter,
  Smile,
  MapPin,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Sidebar = () => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [postText, setPostText] = useState("");

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

  const mediaButtons = [
    { icon: <ImageIcon className="w-5 h-5" />, label: "Media" },
    { icon: <Gift className="w-5 h-5" />, label: "GIF" },
    { icon: <ListFilter className="w-5 h-5" />, label: "Poll" },
    { icon: <Smile className="w-5 h-5" />, label: "Emoji" },
    { icon: <MapPin className="w-5 h-5" />, label: "Location" },
  ];

  const handlePost = () => {
    // Handle post submission here
    console.log("Posting:", postText);
    setPostText("");
    setIsPostModalOpen(false);
  };

  return (
    <>
      <div className="w-64 h-screen bg-black text-white p-4 flex flex-col">
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

        <button
          onClick={() => setIsPostModalOpen(true)}
          className="w-full bg-blue-500 text-white rounded-full py-3 font-bold hover:bg-blue-600"
        >
          Post
        </button>

        <div className="mt-4 flex items-center space-x-3 p-3 hover:bg-gray-900 rounded-full cursor-pointer">
          <img
            src="/api/placeholder/40/40"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col">
            <span className="font-bold">Alex Padilla</span>
            <span className="text-gray-500">@padimaster</span>
          </div>
          <MoreHorizontal size={20} className="ml-auto" />
        </div>
      </div>

      <Dialog open={isPostModalOpen} onOpenChange={setIsPostModalOpen}>
        <DialogContent className="sm:max-w-[600px] bg-black text-white p-0">
          <div className="flex justify-between items-center p-4 border-b border-gray-800">
            <button
              onClick={() => setIsPostModalOpen(false)}
              className="rounded-full p-2 hover:bg-gray-800"
            >
              <X className="w-5 h-5" />
            </button>
            <span className="text-blue-400">Drafts</span>
          </div>

          <div className="p-4">
            <div className="flex gap-3">
              <img
                src="/api/placeholder/40/40"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <textarea
                  placeholder="What is happening?!"
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  className="w-full bg-transparent resize-none outline-none text-xl min-h-[120px]"
                />

                <div className="text-blue-400 text-sm font-normal mt-2">
                  <div className="flex items-center gap-2">
                    <img
                      src="/api/placeholder/16/16"
                      alt="Globe"
                      className="w-4 h-4"
                    />
                    Everyone can reply
                  </div>
                </div>

                <div className="border-t border-gray-800 mt-4 pt-4">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      {mediaButtons.map((button, index) => (
                        <button
                          key={index}
                          className="text-blue-400 p-2 rounded-full hover:bg-blue-900/20"
                          title={button.label}
                        >
                          {button.icon}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={handlePost}
                      className="bg-blue-500 px-4 py-1.5 rounded-full font-bold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!postText.trim()}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Sidebar;