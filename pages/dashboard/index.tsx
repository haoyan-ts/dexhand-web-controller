import React, { useState } from 'react';
import { Container, Typography, Button, Stack, ButtonGroup, Box, Grid2 } from '@mui/material';
import { Canvas } from '@react-three/fiber';

// New Imports for gRPC-web
// import { RobotControlClient } from '../../proto/robot_grpc_web_pb';
// import { CommandRequest } from '../../proto/robot_pb';

// Instantiate the gRPC client (adjust the URL as needed for your gRPC-web proxy endpoint)
// const grpcClient = new RobotControlClient('http://localhost:8080');

const Dashboard: React.FC = () => {
  const [status, setStatus] = useState<string>("disconnected");

  // Updated sendCommand to use the gRPC client
  const sendCommand = async (command: string): Promise<void> => {
    // const request = new CommandRequest();
    // request.setCommand(command);

    // try {
    //   await new Promise((resolve, reject) => {
    //     grpcClient.sendCommand(request, {}, (err, response) => {
    //       if (err) {
    //         console.error("Error sending command:", err);
    //         reject(err);
    //       } else {
    //         console.log("Response from robot:", response.getResponse());
    //         // Optionally update status here based on response
    //         resolve(response);
    //       }
    //     });
    //   });
    // } catch (error) {
    //   console.error("Error in sendCommand:", error);
    // }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Robot Dashboard
        </Typography>
      </Box>

      <Grid2 container spacing={2} sx={{ mb: 4 }}>
        <Grid2 size={{"xs": 12, "md": 3}}>
          <Typography variant="body1" gutterBottom>
            Robot status: {status}
          </Typography>
          <Stack spacing={2} direction="column" sx={{ maxWidth: 200 }}>
            <Button variant="contained" color="primary" onClick={() => sendCommand('start')}>
              Start Robot
            </Button>
            <Button variant="contained" color="primary" onClick={() => sendCommand('stop')}>
              Stop Robot
            </Button>
            <Button variant="contained" color="primary" onClick={() => sendCommand('move-forward')}>
              Move Forward
            </Button>
            <Button variant="contained" color="primary" onClick={() => sendCommand('move-backward')}>
              Move Backward
            </Button>
          </Stack>
        </Grid2>
        <Grid2 size={{"xs": 12, "md": 9}}>
          <Box sx={{ width: '100%', height: '500px', bgcolor: 'grey.200' }}>
            <Canvas>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="orange" />
              </mesh>
            </Canvas>
          </Box>
        </Grid2>
      </Grid2>

      <Box sx={{ mt: 4 }}>
        <Grid2 container spacing={2}>
          <Grid2 size={{"xs": 12, "md": 6}}>
            <Typography variant="h5" component="h2" gutterBottom>
              End-Effector Control
            </Typography>
            <Typography variant="body1" gutterBottom>
              Control Position in 3D:
            </Typography>
            <ButtonGroup variant="contained" color="secondary" sx={{ mb: 2 }}>
              <Button onClick={() => sendCommand('ee_move_x_positive')}>+X</Button>
              <Button onClick={() => sendCommand('ee_move_x_negative')}>-X</Button>
              <Button onClick={() => sendCommand('ee_move_y_positive')}>+Y</Button>
              <Button onClick={() => sendCommand('ee_move_y_negative')}>-Y</Button>
              <Button onClick={() => sendCommand('ee_move_z_positive')}>+Z</Button>
              <Button onClick={() => sendCommand('ee_move_z_negative')}>-Z</Button>
            </ButtonGroup>
            <Typography variant="body1" gutterBottom>
              Control Rotation in 3D:
            </Typography>
            <ButtonGroup variant="contained" color="secondary">
              <Button onClick={() => sendCommand('ee_rotate_x_positive')}>Rotate +X</Button>
              <Button onClick={() => sendCommand('ee_rotate_x_negative')}>Rotate -X</Button>
              <Button onClick={() => sendCommand('ee_rotate_y_positive')}>Rotate +Y</Button>
              <Button onClick={() => sendCommand('ee_rotate_y_negative')}>Rotate -Y</Button>
              <Button onClick={() => sendCommand('ee_rotate_z_positive')}>Rotate +Z</Button>
              <Button onClick={() => sendCommand('ee_rotate_z_negative')}>Rotate -Z</Button>
            </ButtonGroup>
          </Grid2>
          <Grid2 size={{"xs": 12, "md": 6}}>
            <Typography variant="h5" component="h2" gutterBottom>
              Joint Control
            </Typography>
            <Typography variant="body1" gutterBottom>
              Control Joint Angles:
            </Typography>
            <Stack direction="column" spacing={2} sx={{ mb: 2 }}>
              <ButtonGroup variant="contained" color="secondary">
                <Button onClick={() => sendCommand('joint1_increase')}>Joint 1 +</Button>
                <Button onClick={() => sendCommand('joint1_decrease')}>Joint 1 -</Button>
                <Button onClick={() => sendCommand('joint2_increase')}>Joint 2 +</Button>
                <Button onClick={() => sendCommand('joint2_decrease')}>Joint 2 -</Button>
                <Button onClick={() => sendCommand('joint3_increase')}>Joint 3 +</Button>
                <Button onClick={() => sendCommand('joint3_decrease')}>Joint 3 -</Button>
              </ButtonGroup>
              <ButtonGroup variant="contained" color="secondary">
                <Button onClick={() => sendCommand('joint4_increase')}>Joint 4 +</Button>
                <Button onClick={() => sendCommand('joint4_decrease')}>Joint 4 -</Button>
                <Button onClick={() => sendCommand('joint5_increase')}>Joint 5 +</Button>
                <Button onClick={() => sendCommand('joint5_decrease')}>Joint 5 -</Button>
                <Button onClick={() => sendCommand('joint6_increase')}>Joint 6 +</Button>
                <Button onClick={() => sendCommand('joint6_decrease')}>Joint 6 -</Button>
              </ButtonGroup>
            </Stack>
            <Typography variant="body1" gutterBottom>
              Additional Controls:
            </Typography>
            <ButtonGroup variant="contained" color="secondary">
              <Button onClick={() => sendCommand('joint_auto_adjust')}>Auto Adjust</Button>
              <Button onClick={() => sendCommand('joint_stop')}>Stop</Button>
            </ButtonGroup>
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
};

export default Dashboard; 