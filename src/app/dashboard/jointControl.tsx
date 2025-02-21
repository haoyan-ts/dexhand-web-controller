import React, { useState } from "react";
import {
  Typography,
  Stack,
  ButtonGroup,
  Button as MuiButton,
  TextField,
  Grid,
  Box,
} from "@mui/material";
import { useAtom } from "jotai";
import {
  joint1AngleAtom,
  joint2AngleAtom,
  joint3AngleAtom,
  joint4AngleAtom,
  joint5AngleAtom,
  joint6AngleAtom,
} from "@/lib/store";
import { useRobotController } from "@/hooks/useRobotController";

const JointControl: React.FC = () => {
  const [joint1Angle, setJoint1Angle] = useAtom(joint1AngleAtom);
  const [joint2Angle, setJoint2Angle] = useAtom(joint2AngleAtom);
  const [joint3Angle, setJoint3Angle] = useAtom(joint3AngleAtom);
  const [joint4Angle, setJoint4Angle] = useAtom(joint4AngleAtom);
  const [joint5Angle, setJoint5Angle] = useAtom(joint5AngleAtom);
  const [joint6Angle, setJoint6Angle] = useAtom(joint6AngleAtom);
  const [stepSize, setStepSize] = useState(1);
  const { sendCommand } = useRobotController();

  const handleJointChange = (
    joint: number,
    direction: "increase" | "decrease"
  ) => {
    let newAngle: number;
    switch (joint) {
      case 1:
        newAngle =
          direction === "increase"
            ? joint1Angle + stepSize
            : joint1Angle - stepSize;
        setJoint1Angle(newAngle);
        sendCommand(`joint1_${direction}`);
        break;
      case 2:
        newAngle =
          direction === "increase"
            ? joint2Angle + stepSize
            : joint2Angle - stepSize;
        setJoint2Angle(newAngle);
        sendCommand(`joint2_${direction}`);
        break;
      case 3:
        newAngle =
          direction === "increase"
            ? joint3Angle + stepSize
            : joint3Angle - stepSize;
        setJoint3Angle(newAngle);
        sendCommand(`joint3_${direction}`);
        break;
      case 4:
        newAngle =
          direction === "increase"
            ? joint4Angle + stepSize
            : joint4Angle - stepSize;
        setJoint4Angle(newAngle);
        sendCommand(`joint4_${direction}`);
        break;
      case 5:
        newAngle =
          direction === "increase"
            ? joint5Angle + stepSize
            : joint5Angle - stepSize;
        setJoint5Angle(newAngle);
        sendCommand(`joint5_${direction}`);
        break;
      case 6:
        newAngle =
          direction === "increase"
            ? joint6Angle + stepSize
            : joint6Angle - stepSize;
        setJoint6Angle(newAngle);
        sendCommand(`joint6_${direction}`);
        break;
      default:
        break;
    }
  };

  const handleReset = () => {
    setJoint1Angle(0);
    setJoint2Angle(0);
    setJoint3Angle(0);
    setJoint4Angle(0);
    setJoint5Angle(0);
    setJoint6Angle(0);
  };

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom>
        Joint Control
      </Typography>
      <Grid container spacing={2}>
        {[1, 2, 3, 4, 5, 6].map((joint) => (
          <Grid item xs={12} sm={6} md={4} key={`joint-${joint}`}>
            <Typography variant="body1" gutterBottom>
              Joint {joint} Angle:{" "}
              {[
                joint1Angle,
                joint2Angle,
                joint3Angle,
                joint4Angle,
                joint5Angle,
                joint6Angle,
              ][joint - 1].toFixed(2)}
              °
            </Typography>
            <ButtonGroup variant="contained" color="primary">
              <MuiButton onClick={() => handleJointChange(joint, "increase")}>
                Joint {joint} +
              </MuiButton>
              <MuiButton onClick={() => handleJointChange(joint, "decrease")}>
                Joint {joint} -
              </MuiButton>
            </ButtonGroup>
          </Grid>
        ))}
      </Grid>
      <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
        Step Size: {stepSize}
      </Typography>
      <ButtonGroup variant="contained" color="secondary" sx={{ mb: 2 }}>
        <MuiButton onClick={() => setStepSize(0.1)}>0.1</MuiButton>
        <MuiButton onClick={() => setStepSize(1)}>1</MuiButton>
        <MuiButton onClick={() => setStepSize(10)}>10</MuiButton>
      </ButtonGroup>
      <Typography variant="body1" gutterBottom>
        Additional Controls:
      </Typography>
      <ButtonGroup variant="contained" color="secondary">
        <MuiButton onClick={handleReset}>Reset</MuiButton>
      </ButtonGroup>
    </Box>
  );
};

export default JointControl;
