import { SignedIn, SignedOut } from "@clerk/nextjs";
import LandingPage from "./(public)/landingPage/page";

export default function Home() {
  return (
    <div>
      <SignedOut>
        <LandingPage />
      </SignedOut>
      <SignedIn>
        <h1>My Page</h1>
      </SignedIn>
    </div>
  );
}
