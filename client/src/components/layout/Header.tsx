import { auth } from "@clerk/nextjs/server";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

export default async function Header() {
  return (
    <header className="w-full border-b px-6 py-3 flex justify-between items-center">
      <Link href="/" className="font-bold text-lg">
        LifeAssistantAgent
      </Link>

      <nav className="flex items-center gap-4">
        <SignedOut>
          <button className="text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer hover:bg-gray-700">
            <Link href="/sign-in">Sign In</Link>
          </button>
          <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
            <Link href="/sign-up">Sign Up</Link>
          </button>
        </SignedOut>
        <SignedIn>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/settings">Settings</Link>
          <UserButton />
        </SignedIn>
      </nav>
    </header>
  );
}
