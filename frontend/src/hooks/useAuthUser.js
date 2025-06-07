import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";

const useAuthUser = () => {
  const authUser = useQuery({
  queryKey: ["authUser"],
  queryFn : getAuthUser,
   retry:false,// ye krne se auth check krega agar false to redirect homepage nhi to login page
});
return {isLoading: authUser.isLoading,authUser:authUser.data?.user}
}

export default useAuthUser;
