import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import ThemeToggle from "@/src/components/ui/ThemeToggle";

export default async function Header() {
  return (
    <header className="w-full border-b px-6 py-3 flex justify-between items-center dark:border-gray-700">
      <Link href="/" className="font-bold text-lg">
        LifeAssistantAgent
      </Link>

      <nav className="flex items-center gap-4">
        <ThemeToggle />
        <SignedOut>
          <button className="text-gray-700 dark:text-gray-200 rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Link href="/sign-in">Sign In</Link>
          </button>
          <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer hover:bg-[#5a3de6] transition-colors">
            <Link href="/sign-up">Sign Up</Link>
          </button>
        </SignedOut>
        <SignedIn>
          <Link
            href="/settings"
            className="hover:text-[#6c47ff] dark:hover:text-[#818cf8] transition-colors"
          >
            Settings
          </Link>
          <UserButton />
        </SignedIn>
      </nav>
    </header>
  );
}
