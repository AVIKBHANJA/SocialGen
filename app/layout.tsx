import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { PostProvider } from "@/context/PostContext";
import { AdminProvider } from "@/context/AdminContext";
import { FirebaseAuthProvider } from "@/context/FirebaseAuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SocialGen - AI Social Media Post Generator",
  description:
    "Generate engaging social media posts for all platforms powered by Google Gemini 2.0 Flash AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <FirebaseAuthProvider>
            <AuthProvider>
              <PostProvider>
                <AdminProvider>
                  <div className="flex flex-col min-h-screen bg-background text-foreground">
                    <Header />
                    <main className="flex-grow">{children}</main>
                    <Footer />
                  </div>
                </AdminProvider>
              </PostProvider>
            </AuthProvider>
          </FirebaseAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
