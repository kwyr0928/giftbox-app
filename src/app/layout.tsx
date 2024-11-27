import "~/styles/globals.css";

import { type Metadata } from "next";
import { Josefin_Sans } from "next/font/google";

export const metadata: Metadata = {
  title: "GiftBox 3D", // 要相談
  description: "立体的なギフトボックスが作れるアプリ", // 要相談
  icons: [{ rel: "icon", url: "/bird.png" }], // 後ほど変更
};

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={josefinSans.className}>
      <body className="bg-mocha text-darkgray">{children}</body>
    </html>
  );
}
