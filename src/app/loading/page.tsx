"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const router = useRouter();
    const [visibleBirds, setVisibleBirds] = useState(1);

    useEffect(() => {
        const timer = setTimeout(() => {
          router.push("/select");
        }, 5000);
    
        return () => clearTimeout(timer);
      }, [router]);

      useEffect(() => {
        const birdTimer = setInterval(() => {
          setVisibleBirds((prev) => Math.min(prev + 1, 3));
        }, 1500);
    
        return () => clearInterval(birdTimer);
      }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <div>
        <p className="text-4xl">なにができるの？</p>
        <br />
        <p className="text-xl mb-10">
          このアプリでは、3Dモデルを自由に配置し、
          <br />
          オリジナルのギフトボックスを作ることができます。
          <br />
          また、作ったギフトボックスを、
          <br />
          プレゼントとともに大切な人にシェアできます。
          <br />
          <br/>
          <span className="font-bold">3D空間で作り込む体験型のプレゼント</span>
          <br />
          <span className="font-bold">送る人も、もらう人も楽しめるギフト体験を！</span>
        </p>
        <div className="flex justify-center space-x-10">
        {Array.from({ length: visibleBirds }).map((_, index) => (
            <Image
              key={index}
              src={"/bird.png"}
              width={100}
              height={100}
              alt={`bird-${index}`}
            />
          ))}
        </div>
        <p className="mt-6 text-2xl">Now Loading  . . .</p>
      </div>
    </div>
  );
}
