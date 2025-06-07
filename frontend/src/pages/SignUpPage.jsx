import { useState } from "react";
import {MessageCircleHeartIcon, ShipWheelIcon,MessageSquareHeartIcon} from "lucide-react"
import { Link } from "react-router";
import useSignUp from "../hooks/useSignUp.js";


const SignUpPage = () => {
const [signUpData,setSignUpData] = useState({
  fullName:"",
  email:"",
  password:"",
 });

 // iske liye custom hook bnaye same logic
// const queryClient = useQueryClient();
// ye signup data ko backend min send krega
// const {mutate:signupMutation,isPending,error} = useMutation({
//     mutationFn : signup,
//     onSuccess:() =>queryClient.invalidateQueries({queryKey:["authUser"]})
// })

const {isPending,error,signupMutation} =useSignUp();
 const handelSignup = (e) =>{
  e.preventDefault()
  signupMutation(signUpData) //when submit this form then call mutate 
}
  return (
  <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8" data-theme="">
   <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
    {/* signup form - left side */}
    <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
      {/* logo */}
      <div className="mb-4 flex items-center justify-start gap-2">
        < MessageCircleHeartIcon className="size-9 text-primary" />
        <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
          Tawkly
        </span>
      </div>
       {/* error message any */}
          {error && (
            <div className="alert alert-error mb-4">
            <span>{error.response.data.message}</span>

            </div>
          ) }


      <div className="w-full ">
        <form onSubmit={handelSignup}>
         
         <div className="space-y-4">
          <div>
            <h2 className="text-xl front-semibold">Create an Account</h2>
            <p className="text-sm opacity-70">
              Join with Tawkly and turn every chat into a learning adventure !!
            </p>
          </div>
          <div className="space-y-3">
          {/* full Name */}
            <div className="form-control w-full">
              <label className="label">
                    <span className="label-text">Full Name</span>
              </label>
              <input type="text" 
              placeholder="" 
              className="input input-bordered w-full"
              value={signUpData.fullName}
              onChange={(e)=>setSignUpData({...signUpData,fullName:e.target.value})}
              required
              />
            </div>
             
             {/* Email section */}
             <div className="form-control w-full">
              <label className="label">
                    <span className="label-text">Email</span>
              </label>
              <input type="email" 
              placeholder="example@gmail.com" 
              className="input input-bordered w-full"
              value={signUpData.email}
              onChange={(e)=>setSignUpData({...signUpData,email:e.target.value})}
              required
              />
            </div>
          {/* password */}
              <div className="form-control w-full">
              <label className="label">
                    <span className="label-text">Password</span>
              </label>
              <input type="password" 
              placeholder="******" 
              className="input input-bordered w-full"
              value={signUpData.password}
              onChange={(e)=>setSignUpData({...signUpData,password:e.target.value})}
              required
              />
              <p classname="text-xs opacity-70 mt-1">
                Password must be at least 6 characters long
              </p>
            </div>
            
        {/* checkbox */}
        <div className="form-control">
          <label className =" label cursor-pointer justify-start gap-2">
            <input type="checkbox" className="checkbox checkbox-sm" required />
            <span className="text-xs leading-light">
              i agree to the {" "}
              <span className="text-primary hover:underline">terms of service</span> and{" "}
              <span className="text-primary hover:underline">privacy policy</span>
            </span>
          </label>
        </div>
      </div>
              
      <button className="btn btn-primary w-full" type="submit" >
       {isPending ? (
        <>
        <span className="loading loading-spinner loading-xs"></span>
        Loading...
        </>
       ) : (
        "Create Account"
       )}
      </button>
           
           <div className="text-center mt-4">
            <p className="text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
              Sign in
              </Link>
            </p>
           </div>
         </div>
        </form>
      </div>

    </div>
    {/* right side part*/}
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

export default SignUpPage;
