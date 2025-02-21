import React from "react";
import { Typography, ButtonGroup, Button as MuiButton } from "@mui/material";

const sendCommand = async (command: string): Promise<void> => {
  console.log(
    "This is a placeholder for sending commands to the robot. Nothing to do here yet."
  );
  console.log("Sending command:", command);
};

const EndEffectorControl: React.FC = () => {
  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        End-Effector Control
      </Typography>
      <Typography variant="body1" gutterBottom>
        Control Position in 3D:
      </Typography>
      <ButtonGroup variant="contained" color="secondary" sx={{ mb: 2 }}>
        <MuiButton onClick={() => sendCommand("ee_move_x_positive")}>
          +X
        </MuiButton>
        <MuiButton onClick={() => sendCommand("ee_move_x_negative")}>
          -X
        </MuiButton>
        <MuiButton onClick={() => sendCommand("ee_move_y_positive")}>
          +Y
        </MuiButton>
        <MuiButton onClick={() => sendCommand("ee_move_y_negative")}>
          -Y
        </MuiButton>
        <MuiButton onClick={() => sendCommand("ee_move_z_positive")}>
          +Z
        </MuiButton>
        <MuiButton onClick={() => sendCommand("ee_move_z_negative")}>
          -Z
        </MuiButton>
      </ButtonGroup>
      <Typography variant="body1" gutterBottom>
        Control Rotation in 3D:
      </Typography>
      <ButtonGroup variant="contained" color="secondary">
        <MuiButton onClick={() => sendCommand("ee_rotate_x_positive")}>
          Rotate +X
        </MuiButton>
        <MuiButton onClick={() => sendCommand("ee_rotate_x_negative")}>
          Rotate -X
        </MuiButton>
        <MuiButton onClick={() => sendCommand("ee_rotate_y_positive")}>
          Rotate +Y
        </MuiButton>
        <MuiButton onClick={() => sendCommand("ee_rotate_y_negative")}>
          Rotate -Y
        </MuiButton>
        <MuiButton onClick={() => sendCommand("ee_rotate_z_positive")}>
          Rotate +Z
        </MuiButton>
        <MuiButton onClick={() => sendCommand("ee_rotate_z_negative")}>
          Rotate -Z
        </MuiButton>
      </ButtonGroup>
    </>
  );
};

export default EndEffectorControl;
