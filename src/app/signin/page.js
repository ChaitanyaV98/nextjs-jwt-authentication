"use client";
import { useState } from "react";
import CommonFormElement from "@/components/form-element";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { userSignInFormControls, initialSignInFormData } from "../utils";
import { loginUserAction } from "@/actions";

function Signin() {
  const router = useRouter();
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);

  async function handleSignIn() {
    const result = await loginUserAction(signInFormData);
    console.log("Login Result----", result);
    if (result?.success) {
      router.push("/");
      setSignInFormData(initialSignInFormData);
    }
  }
  return (
    <div>
      <h1>Welcome to signIn page</h1>
      <form action={handleSignIn}>
        {userSignInFormControls.map((currentItem) => (
          <div key={currentItem.name}>
            <Label>{currentItem.label}</Label>
            <CommonFormElement
              currentItem={currentItem}
              value={signInFormData[currentItem.name]}
              onChange={(event) => {
                setSignInFormData({
                  ...signInFormData,
                  [event.target.name]: event.target.value,
                });
              }}
            />
          </div>
        ))}
        <Button type="submit">Sign In</Button>
      </form>
    </div>
  );
}

export default Signin;
