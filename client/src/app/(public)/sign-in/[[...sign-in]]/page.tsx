import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-2xl border border-gray-100 rounded-2xl bg-white/80 backdrop-blur-sm",
            headerTitle: "text-2xl font-bold text-gray-900",
            headerSubtitle: "text-gray-600",
            socialButtonsBlockButton:
              "bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium shadow-sm transition-all duration-200 hover:shadow-md",
            socialButtonsBlockButtonText: "font-medium text-gray-700",
            formButtonPrimary:
              "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]",
            formFieldInput:
              "border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg transition-all duration-200",
            formFieldLabel: "text-gray-700 font-medium",
            footerActionLink:
              "text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200",
            identityPreviewText: "text-gray-700",
            formResendCodeLink: "text-indigo-600 hover:text-indigo-700",
            otpCodeFieldInput:
              "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200",
          },
          variables: {
            colorPrimary: "#4f46e5",
            colorBackground: "#ffffff",
            colorInputBackground: "#ffffff",
            colorInputText: "#1f2937",
            borderRadius: "0.75rem",
            fontFamily: "inherit",
            fontSize: "0.875rem",
          },
        }}
        routing="path"
        path="/sign-in"
      />
    </div>
  );
}
