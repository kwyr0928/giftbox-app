import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Model } from "./giftbox";

export default function Rect() {
  return (
    <Canvas camera={{ position: [3, 3, 2] }}>
      <ambientLight />
      <OrbitControls />
      <Model />
    </Canvas>
  );
}
