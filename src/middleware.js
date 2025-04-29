import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function middleware(request) {
  //get current path
  const path = request.nextUrl.pathname;
  //check if the path is public path i.e the path that any user can access
  const checkPublicPath = path === "/signup" || path === "/signin";

  const getCookies = await cookies();
  const token = getCookies.get("token")?.value || "";
  if (checkPublicPath && token !== "") {
    // the above check says that this user is authenticated
    //redirect the user to home page
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!checkPublicPath && token === "") {
    //user is not authenticated
    return NextResponse.redirect(new URL("/signin ", request.nextUrl));
  }
}
//matcher configuration which tells the middleware to run on these specific paths
export const config = {
  matcher: ["/signup", "/signin"],
};
