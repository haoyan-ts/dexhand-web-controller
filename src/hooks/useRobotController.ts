import { useCallback } from "react";

export const useRobotController = () => {
  const sendCommand = useCallback(async (command: string): Promise<void> => {
    console.log(
      "This is a placeholder for sending commands to the robot. Nothing to do here yet."
    );
    console.log("Sending command:", command);
  }, []);

  return { sendCommand };
};
