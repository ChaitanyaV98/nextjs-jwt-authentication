"use server";

import { connectToDB } from "@/database";
import User from "@/models";
import bcryptjs from "bcryptjs";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function registerUserAction(formData) {
  await connectToDB();
  //check if user exists

  try {
    const { userName, email, password } = formData;
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return {
        success: false,
        message: "User already exists. Please try again ",
      };
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    if (savedUser) {
      return {
        success: true,
        message: "Auth success",
        data: JSON.parse(JSON.stringify(savedUser)),
      };
    } else {
      return {
        success: false,
        message: "Something went wrong! Please try again",
      };
    }
  } catch (e) {
    console.log("Error while signup", e);
    return {
      success: false,
      message: "Something went wrong. Please try again",
    };
  }
}

export async function loginUserAction(formData) {
  await connectToDB();
  try {
    const { email, password } = formData;

    //check if username is valid or not
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return {
        success: false,
        message: "User doesnt exists. Please signup ",
      };
    }
    //check if password matches

    const checkPassword = await bcryptjs.compare(password, checkUser.password);
    if (!checkPassword) {
      return {
        success: false,
        message: "Password is not correct, please try againd",
      };
    }
    const createdTokenData = {
      id: checkUser._id,
      userName: checkUser.userName,
    };

    //create accesstoken that holds userId, username, role in encrypted form
    const accessToken = jwt.sign(createdTokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    const getCookies = cookies();
    getCookies.set("token", accessToken); //this is like session storage where token is key and value is accessToken
    return {
      success: true,
      message: "Login is successfull",
    };
  } catch (e) {
    console.log("Error while signup", e);
    return {
      success: false,
      message: "Something went wrong. Please try again",
    };
  }
}

export async function fetchAuthUserAction() {
  await connectToDB();
  try {
    const getCookies = await cookies();
    const token = getCookies.get("token").value || "";
    if (token === "") {
      return {
        success: false,
        message: "Token is invalid",
      };
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const getUserInfo = await User.findOne({ _id: decodedToken.id });
    if (getUserInfo) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(getUserInfo)),
      };
    } else {
      return {
        success: false,
        message: "Some error occured ! Please try again",
      };
    }
  } catch (e) {
    console.log("Error while fetching", e);
  }
}

export async function logoutAction() {
  const getCookies = await cookies();
  getCookies.set("token", "");
}
