import { getStatus } from "@/lib/grpcClient";
import { isConnectedAtom, isEnabledAtom, robotIdAtom } from "@/state/atoms";
import { useAtom } from "jotai";
import React, { useState, useEffect } from "react";

interface RobotStatusData {
  status: string;
  id: string;
}

interface RobotStatusPresenterProps {
  onStatusUpdate: (data: RobotStatusData) => void;
}

const RobotStatusPresenter: React.FC<RobotStatusPresenterProps> = ({
  onStatusUpdate,
}) => {
  const [statusData, setStatusData] = useState<RobotStatusData>({
    status: "Loading...",
    id: "Loading...",
  });
  const [id, setId] = useAtom(robotIdAtom);
  const [isEnabled, setIsEnable] = useAtom<boolean>(isEnabledAtom);
  const [isConnected, setIsConnected] = useAtom<boolean>(isConnectedAtom);

  useEffect(() => {
    const fetchData = () => {
      // Placeholder for gRPC call - replace with your actual gRPC call
      // Example:
      // grpcClient.getRobotStatus({}, (err, response) => {
      //   if (!err && response) {
      //     setStatusData({ status: response.status, id: response.id });
      //     onStatusUpdate({ status: response.status, id: response.id });
      //   } else {
      //     console.error("Error fetching robot status:", err);
      //     setStatusData({ status: 'Error', id: 'Error' });
      //     onStatusUpdate({ status: 'Error', id: 'Error' });
      //   }
      // });

      // Simulate gRPC response for demonstration
      setTimeout(async () => {
        // console.info("{isEnabled, isConnected}", { isEnabled, isConnected });

        if (!isConnected) {
          // console.info("Robot is not enabled or connected");
          return;
        }

        var status = await getStatus(id);
        console.info("Robot ID:", status.getId());
        console.info("Robot Angles:", status.getAnglesList());
        // const simulatedStatus =
        //   Math.random() > 0.5 ? "Connected" : "Disconnected";
        // const simulatedId = Math.floor(Math.random() * 100).toString();
        // setStatusData({ status: simulatedStatus, id: simulatedId });
        // onStatusUpdate({ status: simulatedStatus, id: simulatedId });
      }, 1000);
    };

    fetchData(); // Initial fetch

    const intervalId = setInterval(fetchData, 5000); // Fetch every 5 seconds

    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, [onStatusUpdate, isEnabled, isConnected, id]);

  return null; // Presenter doesn't render anything directly
};

export default RobotStatusPresenter;
