import { authOptions } from "@/auth/auth.config";
import NextAuth from "next-auth";

export default NextAuth(authOptions);
