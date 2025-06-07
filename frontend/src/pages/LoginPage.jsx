import { MessageCircleHeartIcon } from "lucide-react";
import {useState} from "react"
import { Link } from "react-router";
import useLogin from "../hooks/useLogin.js";
const LoginPage = () => {

  const [loginData,setLoginData] = useState({
    email:"",
    password:"",
  });

//ye logic hokkos ke under custom hooks
//  const queryClient = useQueryClient();
//  const {
//   mutate:loginMutation,
//   isPending,
//   error, 
//   }= useMutation({
//     mutationFn:login,
//     onSuccess:() =>queryClient.invalidateQueries({queryKey:["authUser"]}),
//  })
const {isPending,error,loginMutation} = useLogin()

 const handleLogin =(e) =>{
    e.preventDefault();
    loginMutation(loginData);
 }


  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8" data-theme="">
     <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100
     rounded-xl shadow-lg overflow-hidden">
      {/* login form section */}
      <div className="w-full lg:w-1/2 p-4 flex flex-col">
      {/* logo */}
      <div className="mb-4 flex items-center justify-start gap-2">
        <MessageCircleHeartIcon className="size-9 text-primary"/>
        <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r
        from-primary to-secondary tracking-wider">
          Tawkly
        </span>
      </div>
      {/* any error then deisplay */}
      {error && (
        <div className="alert alert-error mb-4">
          <span>{error.response.data.message}</span>
        </div>
      )}

       <div className="w-full">
        <form onSubmit={handleLogin}>
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Welcome Back</h2>
            <p className="text-sm opacity-70">
              sign in to your account to continue your journey
            </p>
          </div>
         
         <div className=" flex flex-col gap-3">
          {/* email part */}
          <div className=" form-control w-full space-y-2">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input 
             type="email"
             placeholder="example@gmail.com"
             className="input input-bordered w-full"
             value={loginData.email}
             onChange={(e) =>setLoginData({...loginData,email:e.target.value})}
             required
            />
          </div>
          
          {/* password section */}
         <div className=" form-control w-full space-y-2">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input 
             type="password"
             placeholder="......"
             className="input input-bordered w-full"
             value={loginData.password}
             onChange={(e) =>setLoginData({...loginData,password:e.target.value})}
             required
            />
          </div>

           <button type="submit" className="btn btn-primary w-full mt-4" disabled={isPending}>
            { isPending ?(
              <>
              <span className="loading loading-spinner loading-x5"></span>
              Signing in...
              </>
            ):(
              "Sign In"
            )

            }
           </button>
           <div className="text-center mt-4">
            <p className="text-sm">
              Don't have an account?{""}
              <Link to="/signup" className="text-primary hover:underline">
              Create one
              </Link>
            </p>
           </div>
         </div>
        </div>
        </form>
       </div>
      </div>    
     {/* image section */}
       <div className ="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
     <div className="max-w-md p-8">
      <div className="realtive aspect-square max-w-sm mx-auto">
        <img src="/Video call.png" alt="" className="w-full h-full" />
      </div>
      <div className="text-center space-y-3 mt-6">
        <h2>Connect with language partners worldwide</h2>
        <p className="opacity-70">
          {/* Practice conversation,make friends,and improve your language skills togather */}
          Practice conversation, make friends, and improve your language skills together. Tawkly — Made in India. Developed by Babul Kumar.
        </p>
      </div>

     </div>
    </div>

     </div>
    </div>
  );
}

export default LoginPage;
