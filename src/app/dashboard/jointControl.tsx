import React from "react";
import {
  Typography,
  Stack,
  ButtonGroup,
  Button as MuiButton,
} from "@mui/material";

const sendCommand = async (command: string): Promise<void> => {
  console.log(
    "This is a placeholder for sending commands to the robot. Nothing to do here yet."
  );
  console.log("Sending command:", command);
};

const JointControl: React.FC = () => {
  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Joint Control
      </Typography>
      <Typography variant="body1" gutterBottom>
        Control Joint Angles:
      </Typography>
      <Stack direction="column" spacing={2} sx={{ mb: 2 }}>
        <ButtonGroup variant="contained" color="secondary">
          <MuiButton onClick={() => sendCommand("joint1_increase")}>
            Joint 1 +
          </MuiButton>
          <MuiButton onClick={() => sendCommand("joint1_decrease")}>
            Joint 1 -
          </MuiButton>
          <MuiButton onClick={() => sendCommand("joint2_increase")}>
            Joint 2 +
          </MuiButton>
          <MuiButton onClick={() => sendCommand("joint2_decrease")}>
            Joint 2 -
          </MuiButton>
          <MuiButton onClick={() => sendCommand("joint3_increase")}>
            Joint 3 +
          </MuiButton>
          <MuiButton onClick={() => sendCommand("joint3_decrease")}>
            Joint 3 -
          </MuiButton>
        </ButtonGroup>
        <ButtonGroup variant="contained" color="secondary">
          <MuiButton onClick={() => sendCommand("joint4_increase")}>
            Joint 4 +
          </MuiButton>
          <MuiButton onClick={() => sendCommand("joint4_decrease")}>
            Joint 4 -
          </MuiButton>
          <MuiButton onClick={() => sendCommand("joint5_increase")}>
            Joint 5 +
          </MuiButton>
          <MuiButton onClick={() => sendCommand("joint5_decrease")}>
            Joint 5 -
          </MuiButton>
          <MuiButton onClick={() => sendCommand("joint6_increase")}>
            Joint 6 +
          </MuiButton>
          <MuiButton onClick={() => sendCommand("joint6_decrease")}>
            Joint 6 -
          </MuiButton>
        </ButtonGroup>
      </Stack>
      <Typography variant="body1" gutterBottom>
        Additional Controls:
      </Typography>
      <ButtonGroup variant="contained" color="secondary">
        <MuiButton onClick={() => sendCommand("joint_auto_adjust")}>
          Auto Adjust
        </MuiButton>
        <MuiButton onClick={() => sendCommand("joint_stop")}>Stop</MuiButton>
      </ButtonGroup>
    </>
  );
};

export default JointControl;
