import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { StreamChat } from "stream-chat";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const MessagesPage = () => {
  const { authUser } = useAuthUser();
  const navigate = useNavigate();
  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const fetchChannels = async () => {
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

      const res = await client.queryChannels(
        { members: { $in: [authUser._id] } },
        { last_message_at: -1 },
        { watch: true, state: true }
      );

      setChannels(res);
    };

    fetchChannels();
  }, [authUser, tokenData]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Recent Chats</h2>
      <div className="space-y-3">
        {channels.map((channel) => {
          const otherUser = Object.values(channel.state.members).find(
            (m) => m.user.id !== authUser._id
          )?.user;

          if (!otherUser) return null;

          return (
            <div
              key={channel.id}
              className="flex items-center gap-3 p-2 border rounded-lg hover:bg-base-300 cursor-pointer"
              onClick={() => navigate(`/chat/${otherUser.id}`)}
            >
              <img
                src={otherUser.image}
                alt={otherUser.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">{otherUser.name}</p>
                <p className="text-xs text-gray-500">
                  {channel.data.last_message?.text?.slice(0, 30) || "Start chatting..."}
                </p>
              </div>
              {channel.countUnread() > 0 && (
                <span className="ml-auto text-xs bg-red-500 text-white rounded-full px-2">
                  {channel.countUnread()}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MessagesPage;
