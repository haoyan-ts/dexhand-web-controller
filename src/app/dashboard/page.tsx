"use client";
import React, { useState, useRef } from "react";
import { Container, Typography, Box, Grid2 } from "@mui/material";
import RobotControlButtons from "./robotControlButtons";
import EndEffectorControl from "./endEffectorControl";
import JointControl from "./jointControl";
import RobotStatus from "./robotStatus";
import Scene from "./threeDView";
import { Canvas } from "@react-three/fiber";

import { useAtom } from "jotai";
import { robotIdAtom, robotConnectionStatusAtom } from "../../state/atoms";

const Dashboard: React.FC = () => {
  const [robotConnectionStatus] = useAtom<string>(robotConnectionStatusAtom);
  const [robotId] = useAtom<string>(robotIdAtom);

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Robot Dashboard
        </Typography>
      </Box>

      <Grid2 container spacing={2} sx={{ mb: 4 }}>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <RobotStatus status={robotConnectionStatus} id={robotId} />
          <RobotControlButtons />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 9 }}>
          <Box sx={{ height: 400 }}>
            <Canvas shadows camera={{ position: [0, 0, 5], fov: 60 }}>
              <Scene />
            </Canvas>
          </Box>
        </Grid2>
      </Grid2>

      <Box sx={{ mt: 4 }}>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <EndEffectorControl />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <JointControl />
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
};

export default Dashboard;
