import { useEffect, useState } from "react";
import { useParams } from "react-router"
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";


import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,

} from "stream-chat-react";

import {StreamChat} from "stream-chat";
import toast from "react-hot-toast";
import ChatLoader from "../components/ChatLoader.jsx";
import CallButton from "../components/CallButton.jsx";



//stream api key
const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY

const ChatPage = () => {

const {id:targetUserId}= useParams() ; 

const [chatClient,setChatClient] = useState();
const [channel,setChannel] =useState(null);
const [loading,setLoading] = useState(true);

const {authUser} =useAuthUser();
const {data:tokenData} = useQuery({
       queryKey:["streamToken"],
       queryFn:getStreamToken,
       enabled:!!authUser // this will run only when authUser is avilable
})

useEffect (()=>{
  const initChat = async ()=>{
    if(!tokenData?.token || !authUser) return

    try{
     console.log("Initializing stream chat client ...")

     const client = StreamChat.getInstance(STREAM_API_KEY);

     await client.connectUser({
      id:authUser._id,
      name:authUser.fullName,
      image:authUser.profilePic,
     },tokenData.token)
    

     //create a unique channelid 
     const channelId= [authUser._id,targetUserId].sort().join("-");
     //you and me
     //if i start the chat => channelId:[myId,yourId]
     //if you start the chat => channelId:[yourId,myId], to computer channelid ko sort krta h .sort().join se
     
     //create a message channel
     const currChannel = client.channel("messaging",channelId,{
      members:[authUser._id,targetUserId],
     })

     await currChannel.watch(); //real time incoming changes

     setChatClient(client);
     setChannel(currChannel);
     

    }catch(error){
         console.error("Error initializing chat:",error);
         toast.error("Could not connect to chat. please try aganin");
    } finally{
      setLoading(false)
    }

  }
  initChat()
},[tokenData,authUser,targetUserId])


//vidocall handle logic here
 const handleVideoCall =()=>{
     if (channel) {
      //calling ka link yhi se jata h mera localhost uske bad channel id
  const callUrl = `${window.location.origin}/call/${channel.id}`;

  channel.sendMessage({
    text: `I've started a video call. Join me here: ${callUrl}`,
  });
    toast.success("Video call link sent successfully !!");

 }


 };


if(loading || !chatClient || !channel) return <ChatLoader />

  return <div className="h-[93vh]">
    <Chat client={chatClient}>
      <Channel channel={channel}>
        <div className="w-full relative">

          <CallButton handleVideoCall={handleVideoCall} />

          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput focus />
          </Window>
        </div>
        <Thread />
      </Channel>

    </Chat>



  </div>
}

export default ChatPage
