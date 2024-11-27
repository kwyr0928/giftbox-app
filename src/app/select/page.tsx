"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Rect from "~/components/three/rect";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "~/components/ui/carousel";


export default function Page() {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) {
          return
        }
        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)
        api.on("select", () => {
          setCurrent(api.selectedScrollSnap() + 1)
        })
      }, [api]);

  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <p>
        1. Box選択　＞　
        <span className="text-gray-400">2. モデル作成　＞　3. シェア</span>
      </p>
      <p className="text-3xl my-10">作成したいBoxを選んでください</p>
      <Carousel setApi={setApi}>
        <CarouselContent className=" w-[700px]">
          <CarouselItem>
            <Card className="h-[500px]">
              <CardContent className="h-[400px]">
                <p className="my-10 text-lg">直方体</p>
                <Rect />
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card className="h-[500px]">
              <CardContent className="h-[400px]">
                <p className="my-10 text-lg">円柱</p>
                {/* 仮 */}
                <Rect />
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card className="h-[500px]">
              <CardContent className="h-[400px]">
                <p className="my-10 text-lg">ハート</p>
                {/* 仮 */}
                <Rect />
              </CardContent>
            </Card>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <p className="mt-3 text-lg">{current} / {count}</p>
      <Button asChild className="mt-12 px-14 py-8 bg-white hover:bg-gray-100 text-darkgray shadow-darkgray rounded-full text-2xl">
        <Link href="/create">作成画面へ</Link>
      </Button>
    </div>
  );
}
