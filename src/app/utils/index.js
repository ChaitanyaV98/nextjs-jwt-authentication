export const userRegistrationFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Please enter user name",
    ComponentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Please enter your email",
    ComponentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Please enter password",
    ComponentType: "input",
    type: "password",
  },
];

export const initialSignUpFormData = {
  userName: "",
  email: "",
  password: "",
};

export const userSignInFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Please enter your email",
    ComponentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Please enter password",
    ComponentType: "input",
    type: "password",
  },
];

export const initialSignInFormData = {
  email: "",
  password: "",
};
