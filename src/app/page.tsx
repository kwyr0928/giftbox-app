"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function Page() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <div className="flex items-center justify-center">
        <p className="text-8xl tracking-widest">Gift</p>
        <Image
          src={"/present.png"}
          width={100}
          height={100}
          alt="bird.png"
          className="ml-10 mr-20"
        ></Image>
      </div>
      <div className="flex items-center justify-center">
        <Image
          src={"/bird.png"}
          width={100}
          height={100}
          alt="bird.png"
          className="mx-20"
        ></Image>
        <p className="text-8xl tracking-widest">Box</p>
      </div>
      <Button asChild className="mt-36 px-20 py-10 bg-white hover:bg-gray-100 text-darkgray shadow-darkgray rounded-full text-4xl">
        <Link href="/loading">Let&apos;s Create!</Link>
      </Button>
    </div>
  );
}
