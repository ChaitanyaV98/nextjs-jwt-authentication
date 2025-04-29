"use client";

// import { userRegistrationFormControls, initialSignUpFormData } from "@utils";
import CommonFormElement from "@/components/form-element";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { userRegistrationFormControls, initialSignUpFormData } from "../utils";
import { useState } from "react";
import { registerUserAction } from "@/actions";

function SignUp() {
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);

  const router = useRouter();

  function handleSignupButtonValid() {
    return Object.keys(signUpFormData).every(
      (key) => signUpFormData[key].trim() !== ""
    );
  }
  async function handleSignUp() {
    const result = await registerUserAction(signUpFormData);
    console.log(result);

    if (result?.data) {
      router.push("/signin");
    }
  }

  console.log("SIGNUP FORM DATA...", signUpFormData);

  return (
    <div>
      <h1>Registration form</h1>
      <form action={handleSignUp}>
        {userRegistrationFormControls.map((controlItem) => (
          <div key={controlItem.name}>
            <Label>{controlItem.label}</Label>
            <CommonFormElement
              currentItem={controlItem}
              value={signUpFormData[controlItem.name]}
              onChange={(event) => {
                setSignUpFormData({
                  ...signUpFormData,
                  [event.target.name]: event.target.value,
                });
              }}
            />
          </div>
        ))}

        <Button
          disabled={!handleSignupButtonValid()}
          type="submit"
          className="disabled:opacity-65"
        >
          Save
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
