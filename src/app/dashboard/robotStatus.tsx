import React from "react";
import { Typography } from "@mui/material";

interface RobotStatusProps {
  status: string;
  id: string;
}

const RobotStatus: React.FC<RobotStatusProps> = ({ status, id }) => {
  return (
    <div>
      <Typography variant="body1" gutterBottom>
        Robot connection status:
      </Typography>
      <Typography variant="body1" gutterBottom fontWeight="bold">
        {status}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Current robot id:
      </Typography>
      <Typography variant="body1" fontWeight="bold" gutterBottom>
        {id}
      </Typography>
    </div>
  );
};

export default RobotStatus;
