import * as THREE from "three";
import { memo, useRef, forwardRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  Grid,
  Center,
  AccumulativeShadows,
  RandomizedLight,
  Environment,
  useGLTF,
  CameraControls,
} from "@react-three/drei";
import { useControls, button, buttonGroup, folder } from "leva";
import { Box } from "@mui/material";

const { DEG2RAD } = THREE.MathUtils;

const Scene: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const cameraControlsRef = useRef<CameraControls>(null);

  const { camera } = useThree();

  // All same options as the original "basic" example: https://yomotsu.github.io/camera-controls/examples/basic.html
  const {
    minDistance,
    enabled,
    verticalDragToForward,
    dollyToCursor,
    infinityDolly,
  } = useControls({
    thetaGrp: buttonGroup({
      label: "rotate theta",
      opts: {
        "+45º": () => cameraControlsRef.current?.rotate(45 * DEG2RAD, 0, true),
        "-90º": () => cameraControlsRef.current?.rotate(-90 * DEG2RAD, 0, true),
        "+360º": () =>
          cameraControlsRef.current?.rotate(360 * DEG2RAD, 0, true),
      },
    }),
    phiGrp: buttonGroup({
      label: "rotate phi",
      opts: {
        "+20º": () => cameraControlsRef.current?.rotate(0, 20 * DEG2RAD, true),
        "-40º": () => cameraControlsRef.current?.rotate(0, -40 * DEG2RAD, true),
      },
    }),
    truckGrp: buttonGroup({
      label: "truck",
      opts: {
        "(1,0)": () => cameraControlsRef.current?.truck(1, 0, true),
        "(0,1)": () => cameraControlsRef.current?.truck(0, 1, true),
        "(-1,-1)": () => cameraControlsRef.current?.truck(-1, -1, true),
      },
    }),
    dollyGrp: buttonGroup({
      label: "dolly",
      opts: {
        "1": () => cameraControlsRef.current?.dolly(1, true),
        "-1": () => cameraControlsRef.current?.dolly(-1, true),
      },
    }),
    zoomGrp: buttonGroup({
      label: "zoom",
      opts: {
        "/2": () => cameraControlsRef.current?.zoom(camera.zoom / 2, true),
        "/-2": () => cameraControlsRef.current?.zoom(-camera.zoom / 2, true),
      },
    }),
    minDistance: { value: 0 },
    moveTo: folder(
      {
        vec1: { value: [3, 5, 2], label: "vec" },
        "moveTo(…vec)": button((get) => {
          const vec1 = get("moveTo.vec1") as [number, number, number];
          cameraControlsRef.current?.moveTo(...vec1, true);
        }),
      },
      { collapsed: true }
    ),
    "fitToBox(mesh)": button(() => {
      if (meshRef.current) {
        cameraControlsRef.current?.fitToBox(meshRef.current, true);
      }
    }),
    setPosition: folder(
      {
        vec2: { value: [-5, 2, 1], label: "vec" },
        "setPosition(…vec)": button((get) => {
          const vec2 = get("setPosition.vec2") as [number, number, number];
          cameraControlsRef.current?.setPosition(...vec2, true);
        }),
      },
      { collapsed: true }
    ),
    setTarget: folder(
      {
        vec3: { value: [3, 0, -3], label: "vec" },
        "setTarget(…vec)": button((get) => {
          const vec3 = get("setTarget.vec3") as [number, number, number];
          cameraControlsRef.current?.setTarget(...vec3, true);
        }),
      },
      { collapsed: true }
    ),
    setLookAt: folder(
      {
        vec4: { value: [1, 2, 3], label: "position" },
        vec5: { value: [1, 1, 0], label: "target" },
        "setLookAt(…position, …target)": button((get) => {
          const vec4 = get("setLookAt.vec4") as [number, number, number];
          const vec5 = get("setLookAt.vec5") as [number, number, number];
          return cameraControlsRef.current?.setLookAt(...vec4, ...vec5, true);
        }),
      },
      { collapsed: true }
    ),
    lerpLookAt: folder(
      {
        vec6: { value: [-2, 0, 0], label: "posA" },
        vec7: { value: [1, 1, 0], label: "tgtA" },
        vec8: { value: [0, 2, 5], label: "posB" },
        vec9: { value: [-1, 0, 0], label: "tgtB" },
        t: { value: Math.random(), label: "t", min: 0, max: 1 },
        "f(…posA,…tgtA,…posB,…tgtB,t)": button((get) => {
          const vec6 = get("lerpLookAt.vec6") as [number, number, number];
          const vec7 = get("lerpLookAt.vec7") as [number, number, number];
          const vec8 = get("lerpLookAt.vec8") as [number, number, number];
          const vec9 = get("lerpLookAt.vec9") as [number, number, number];
          return cameraControlsRef.current?.lerpLookAt(
            ...vec6,
            ...vec7,
            ...vec8,
            ...vec9,
            get("lerpLookAt.t"),
            true
          );
        }),
      },
      { collapsed: true }
    ),
    saveState: button(() => cameraControlsRef.current?.saveState()),
    reset: button(() => cameraControlsRef.current?.reset(true)),
    enabled: { value: true, label: "controls on" },
    verticalDragToForward: {
      value: false,
      label: "vert. drag to move forward",
    },
    dollyToCursor: { value: false, label: "dolly to cursor" },
    infinityDolly: { value: false, label: "infinity dolly" },
  });

  return (
    <>
      <group position-y={-0.5}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Center top>
          <mesh ref={meshRef}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#9d4b4b" />
          </mesh>
        </Center>
        <Ground />
        <CameraControls
          ref={cameraControlsRef}
          minDistance={minDistance}
          enabled={enabled}
          dollyToCursor={dollyToCursor}
          infinityDolly={infinityDolly}
        />
        {/* <Environment files={suspend(city).default} /> */}
      </group>
    </>
  );
};

function Ground() {
  const gridConfig = {
    cellSize: 0.5,
    cellThickness: 0.5,
    cellColor: "#6f6f6f",
    sectionSize: 3,
    sectionThickness: 1,
    sectionColor: "#9d4b4b",
    fadeDistance: 30,
    fadeStrength: 1,
    followCamera: false,
    infiniteGrid: true,
  };
  return <Grid position={[0, -0.01, 0]} args={[10.5, 10.5]} {...gridConfig} />;
}

// const ThreeDView: React.FC = () => {
//   const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);
//   const meshRef = useRef<THREE.Mesh>(null);

//   const bind = useDrag(
//     ({ offset: [x, y], down }) => {
//       setPosition([x, y, 0]);
//     },
//     { eventOptions: { capture: false } }
//   );

//   return (
//     <Box sx={{ width: "100%", height: "500px", bgcolor: "grey.200" }}>
//       <Canvas
//         camera={{ position: [5, 5, 5], zoom: 20 }}
//         style={{ background: "#eeeeee" }}
//       >
//         <ambientLight intensity={0.8} />
//         <directionalLight position={[1, 1, 1]} intensity={0.8} />
//         <gridHelper args={[20, 20, "gray", "gray"]} />
// <mesh {...bind()} ref={meshRef} position={position}>
//   <boxGeometry args={[1, 1, 1]} />
//   <meshStandardMaterial color="orange" />
// </mesh>
//         <OrbitControls />
//       </Canvas>
//     </Box>
//   );
// };

export default Scene;
