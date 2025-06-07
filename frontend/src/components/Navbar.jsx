import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser"
import { BellIcon, LogOutIcon, MessageCircleHeartIcon, Send } from "lucide-react";
import ThemeSelector from "./ThemeSelector.jsx";
import useLogout from "../hooks/useLogout.js";
import { useQuery } from "@tanstack/react-query";
import { getFriendRequests,getStreamToken } from "../lib/api";
import { StreamChat } from "stream-chat";
import { useState,useEffect } from "react";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const Navbar = () => {
   const {authUser}= useAuthUser();
   const location = useLocation();
   const isChatPage = location.pathname?.startsWith("/chat");
  const [unreadCount, setUnreadCount] = useState(0);

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  // this logic inside hook
   const {logoutMutation}=useLogout();

// ye notification show count ka logic
const { data: friendRequests } = useQuery({
  queryKey: ["friendRequests"],
  queryFn: getFriendRequests,
});
const incomingCount = friendRequests?.incomingReqs?.length || 0;

    
  //mesage count show ka logic
    useEffect(() => {
   const fetchUnreadMessages = async () => {
    if (!authUser || !tokenData?.token) return;
    const client = StreamChat.getInstance(STREAM_API_KEY);
    await client.connectUser(
      {
        id: authUser._id,
        name: authUser.fullName,
        image: authUser.profilePic,
      },
      tokenData.token
    );

    const channels = await client.queryChannels(
      { members: { $in: [authUser._id] } },
      { last_message_at: -1 },
      { watch: true, state: true }
    );

    let total = 0;
    channels.forEach((channel) => {
      total += channel.countUnread();
    });

    setUnreadCount(total);
  };

  fetchUnreadMessages();

  // Refetch unread messages whenever path changes
  if (location.pathname === "/messages") {
    const interval = setTimeout(() => {
      fetchUnreadMessages(); // Refetch after navigating to /messages
    }, 2000); // wait 2s for Stream to sync state
    return () => clearTimeout(interval); // cleanup
  }

}, [authUser, tokenData, location.pathname]);



  return <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-end w-full ">
        {/* logo only in the chat page */}
      {isChatPage && (
        <div className="pl-5">
            <Link to="/" className="flex items-center gap-2.5">
             < MessageCircleHeartIcon className="size-9 text-primary" />
        <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
          Tawkly
        </span>
        </Link>
        </div>
      )}
       
          
        {/* notifications */}
        <div className="flex items-center gap-2 sm:gap-2 ml-auto">
          <Link to="/notifications">
           <button className="btn btn-ghost btn-circle relative">
           <BellIcon className="h-6 w-6 text-base-content opacity-70" />
           {incomingCount > 0 && (
            <span className="absolute top-4 right-4 -translate-y-1/2 translate-x-1/2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
          {incomingCount}
        </span>
        )}
      </button>
     </Link>
     {/* message icon */}
       <Link to="/messages">
       <button className="btn btn-ghost btn-circle relative">
       <Send className="h-5 w-5 text-base-content opacity-70" />
       {unreadCount > 0 && (
      <span className="absolute top-4 right-4 -translate-y-1/2 translate-x-1/2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
        {unreadCount}
      </span>
       )}
      </button>
      </Link>
     </div>

        {/* ToDO */}
       <ThemeSelector />
        <div className="avatar">
                <div className="w-9 rounded-full">
                    <img src={authUser?.profilePic}  alt="User Avatar" />
                </div>
            </div>

            {/* logout button */}
      <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
        <LogOutIcon className="h-6 w-6 text-base-content opacity-70"/>
      </button>
    </div>
  </div>
  </nav>
}

export default Navbar

