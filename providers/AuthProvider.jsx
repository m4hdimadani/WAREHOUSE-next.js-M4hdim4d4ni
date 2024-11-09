
import Link from "next/link";
import { getCookie } from "../utils/cookie";

function AuthProvider({children}) {
    const token = getCookie("token");
    if (!token) return <Link  href="/login"/>
  return children
    
 
}

export default AuthProvider