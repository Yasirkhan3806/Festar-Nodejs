import { useState } from "react";
import LoginForm1 from "./LoginForm1";
import SignUpForm from "./SignUpForm";
import BackgroundAnimation from "./BoxMoveAnimations";


export default function LoginForm() {
  const [signUp,setSignUp] = useState(false)

  return (
   <>
   <div className="relative">
      <BackgroundAnimation />
      <div className="absolute inset-0 flex items-center justify-center">
        {signUp?( <SignUpForm setSignUp={setSignUp}/>):( <LoginForm1 setSignup={setSignUp}/>)}
     
      </div>
    </div>


   </>
  );
}
