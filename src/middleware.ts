import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Get cookies for authentication and user data
  const token = req.cookies.get("jwt")?.value; // JWT token for authentication
  const userData = req.cookies.get("user")?.value; // User data stored in cookies

  // console.log("Raw user data from cookies:", userData);

  let user = null;
  try {
    user = userData ? JSON.parse(userData) : null;
  } catch (error) {
    // console.error("Error parsing user data:", error);
  }

  // console.log("Parsed user data:", user);

  const userRole = user?.role || "guest"; // Default to guest if no role is found
  const userEmail = user?.email || ""; // Get the user's email
  // console.log("User role:", userRole);
  // console.log("User email:", userEmail);

  // List of admin emails
  const adminEmails = ["azohaibshoukat22@gmail.com"]; // Modify with actual admin emails

  // Restrict /admin to only Admin users or those with specific admin emails
  if (
    pathname.startsWith("/admin") &&
    userRole !== "Admin" &&
    !adminEmails.includes(userEmail)
  ) {
    // console.warn(
    //   "Unauthorized access attempt to /admin by:",
    //   userRole,
    //   userEmail
    // );
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Restrict /checkout to authenticated users
  if (pathname.startsWith("/checkout") && !token) {
    console.warn("Unauthorized checkout attempt - No token found.");
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Allow all other routes
  return NextResponse.next();
}

// Apply middleware only to specific routes
export const config = {
  matcher: ["/admin/:path*", "/checkout/:path*"], // Apply middleware to these routes
};
