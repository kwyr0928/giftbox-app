"use client";

import { TransformControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import {
  Card,
  CardContent,
} from "~/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";

function InteractiveBox({ color, initialPosition, onPositionChange }) {
  const [mode, setMode] = useState('translate');
  const transformControlsRef = useRef(null);
  const meshRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch(e.key.toLowerCase()) {
        case 'm':
          setMode('translate');
          break;
        case 'r':
          setMode('rotate');
          break;
        case 's':
          setMode('scale');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (meshRef.current && onPositionChange) {
      const currentPosition = meshRef.current.position;
      onPositionChange(currentPosition);
    }
  }, [onPositionChange]);

  return (
    <>
      <mesh ref={meshRef} position={initialPosition}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <TransformControls 
        ref={transformControlsRef}
        object={meshRef}
        mode={mode}
        enabled={true}
      />
    </>
  );
}

export default function Page() {
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const [boxPositions, setBoxPositions] = useState({});

  const colors = [
    'red', 'blue', 'green', 'yellow', 'purple', 'orange', 
    'cyan', 'magenta', 'lime'
  ];

  const handleBoxSelect = (index) => {
    setSelectedBoxes(prev => {
      const newSelectedBoxes = prev.includes(index)
        ? prev.filter(boxIndex => boxIndex !== index)
        : [...prev, index];
      
      if (!prev.includes(index)) {
        const newPosition = calculateInitialPosition(newSelectedBoxes);
        setBoxPositions(prev => ({
          ...prev,
          [index]: newPosition
        }));
      }
      
      return newSelectedBoxes;
    });
  };

  const calculateInitialPosition = (currentSelectedBoxes) => {
    if (currentSelectedBoxes.length === 0) return [0, 0, 0];
    
    // すでに存在するボックスの最後の位置を基準に新しいボックスの位置を計算
    const lastBoxIndex = currentSelectedBoxes[currentSelectedBoxes.length - 2];
    const lastPosition = boxPositions[lastBoxIndex] || [0, 0, 0];
    
    return [lastPosition[0] + 2, 0, 0];
  };

  const handlePositionChange = (index) => (newPosition) => {
    setBoxPositions(prev => ({
      ...prev,
      [index]: [newPosition.x, newPosition.y, newPosition.z]
    }));
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <p className="mb-10">
        1. Box選択　＞　
        2. モデル作成　<span className="text-gray-400">＞　3. シェア</span>
      </p>
      
      <Card className="w-[700px] h-[500px] mb-20">
        <CardContent className="w-[700px] h-[480px] my-5">
          {selectedBoxes.length > 0 ? (
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              {selectedBoxes.map((boxIndex) => (
                <InteractiveBox
                  key={boxIndex}
                  color={colors[boxIndex]}
                  initialPosition={boxPositions[boxIndex] || [0, 0, 0]}
                  onPositionChange={handlePositionChange(boxIndex)}
                />
              ))}
            </Canvas>
          ) : (
            <div className="flex items-center justify-center h-full">
              ボックスを選択してください
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="mb-4">
        <p>操作方法:</p>
        <p>M: 移動モード、R: 回転モード、S: 拡大/縮小モード</p>
        <p>各モードで左クリック長押し + ドラッグで操作</p>
      </div>

      <Carousel>
        <CarouselContent className="w-[700px]">
          {colors.map((color, index) => (
            <CarouselItem key={index} className="basis-24">
              <Card 
                className={`h-[100px] cursor-pointer ${selectedBoxes.includes(index) ? 'border-2 border-blue-500' : ''}`}
                onClick={() => handleBoxSelect(index)}
              >
                <CardContent className="h-[100px] flex items-center justify-center">
                  <Canvas className="w-full h-full">
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <mesh>
                      <boxGeometry args={[1, 1, 1]} />
                      <meshStandardMaterial color={color} />
                    </mesh>
                  </Canvas>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}