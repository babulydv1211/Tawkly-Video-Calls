import {StreamChat} from "stream-chat"
import "dotenv/config"

const  apiKey= process.env.STEAM_API_KEY

const apiSecret = process.env.STEAM_API_SECRET

if(!apiKey|| !apiSecret){
    console.error("Stream Api key or Secret is missing");
}

const streamClient = StreamChat.getInstance(apiKey,apiSecret);

export const upsertStreamUser= async (userData) =>{
    try{
        await streamClient.upsertUsers([userData]);
        return userData
    }catch(error){
        console.error("Error upserting Stream User:",error);

    }
};


// stream se token generate kiya h chat ke liye
export const generateStreamToken=(userId) =>{
    try{
   //ensure userId is a string
   const userIdStr= userId.toString();
    return streamClient.createToken(userIdStr);
    }catch(error){
      console.error("Error to generating stream token:",error);
    }
};