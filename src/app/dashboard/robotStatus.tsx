import React, { useState } from "react";
import { Typography } from "@mui/material";
import RobotStatusPresenter from "./RobotStatusPresenter";

interface RobotStatusProps {
  // id and status are no longer required, since they will be updated by the presenter
}

const RobotStatus: React.FC<RobotStatusProps> = () => {
  const [status, setStatus] = useState<string>("Loading...");
  const [id, setId] = useState<string>("Loading...");

  const handleStatusUpdate = (data: { status: string; id: string }) => {
    setStatus(data.status);
    setId(data.id);
  };

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
      <RobotStatusPresenter onStatusUpdate={handleStatusUpdate} />
    </div>
  );
};

export default RobotStatus;
