import BicycleCanvas from "@/components/BicycleCanvas/BicycleCanvas";
import Canvas from "@/components/Canvas/Canvas";
import Overlay from "@/components/Overlay/Overlay";

export default function Home() {
  return (
    <main>
      <BicycleCanvas />
      {/* <Canvas /> */}
      <Overlay />
    </main>
  );
}
