import { useCallback } from "react";
import { sendGrpcCommand as sendGrpcCommandLib } from "../lib/grpcClient";

export const useRobotController = () => {
  const sendCommand = useCallback(async (command: string): Promise<void> => {
    console.log(
      "This is a placeholder for sending commands to the robot. Nothing to do here yet."
    );
    console.log("Sending command:", command);
  }, []);

  const sendGrpcCommand = useCallback(async (command: string): Promise<void> => {
    try {
      await sendGrpcCommandLib(command);
    } catch (error) {
      console.error("Failed to send gRPC command:", error);
      throw error;
    }
  }, []);

  return { sendCommand, sendGrpcCommand };
};
