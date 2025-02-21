import React from "react";
import { Stack, Button as MuiButton, ButtonGroup } from "@mui/material";
import {
  EnableDexHandRequest,
  DisableDexHandRequest,
  ConnectDexHandRequest,
  DisconnectDexHandRequest,
} from "../../../proto/ts/dexhand/v1/dexhand_control_service_pb";
import { DexHandControlServiceClient } from "../../../proto/ts/dexhand/v1/dexhand_control_service_grpc_web_pb";
import { DexHandServiceClient } from "../../../proto/ts/dexhand/v1/dexhand_service_grpc_web_pb";
import {
  CreateDexHandRequest,
  DexHandConfig,
  DexHand,
} from "../../../proto/ts/dexhand/v1/dexhand_service_pb";
import {
  ArmType,
  HandType,
  Side,
} from "../../../proto/ts/dexhand/v1/common_pb";
import { robotConnectionStatusAtom, robotIdAtom } from "@/state/atoms";
import { useAtom } from "jotai";

// Instantiate the gRPC client (adjust the URL as needed for your gRPC-web proxy endpoint)
const grpcClient = new DexHandControlServiceClient("http://192.168.2.124:8080");
const grpcClient2 = new DexHandServiceClient("http://192.168.2.124:8080");

let latestDexHandId = "";

const enableDexHand = async () => {
  const request = new EnableDexHandRequest();
  request.setId(latestDexHandId);

  const response = await new Promise((resolve, reject) => {
    grpcClient.enableDexHand(request, {}, (err, response) => {
      if (err) {
        console.error("Error sending command:", err);
        reject(err);
      } else {
        console.log("Response from robot:", response);
        resolve(response);
      }
    });
  });
};

const disableDexHand = async () => {
  const request = new DisableDexHandRequest();
  request.setId(latestDexHandId);
  await new Promise((resolve, reject) => {
    grpcClient.disableDexHand(request, {}, (err, response) => {
      if (err) {
        console.error("Error sending disable command:", err);
        reject(err);
      } else {
        console.log("Response from disable:", response);
        resolve(response);
      }
    });
  });
};

const connectDexHand = async (afterProcess: VoidFunction) => {
  const request = new ConnectDexHandRequest();
  request.setId(latestDexHandId);
  await new Promise((resolve, reject) => {
    grpcClient.connectDexHand(request, {}, (err, response) => {
      if (err) {
        console.error("Error sending connect command:", err);
        reject(err);
      } else {
        console.log("Response from connect:", response);
        resolve(response);
      }
    });
  });

  afterProcess();
};

const disconnectDexHand = async (afterProcess: VoidFunction) => {
  const request = new DisconnectDexHandRequest();
  request.setId(latestDexHandId);
  await new Promise((resolve, reject) => {
    grpcClient.disconnectDexHand(request, {}, (err, response) => {
      if (err) {
        console.error("Error sending disconnect command:", err);
        reject(err);
      } else {
        console.log("Response from disconnect:", response);
        resolve(response);
      }
    });
  });
  afterProcess();
};

interface AfterProcess {
  (id: string): void;
}

const createDexHand = async (afterProcess: AfterProcess): Promise<string> => {
  const request = new CreateDexHandRequest();
  const config = new DexHandConfig();

  config.setSide(Side.SIDE_LEFT);
  config.setArmType(ArmType.ARM_TYPE_PIPER);
  config.setHandType(HandType.HAND_TYPE_INSPIRE);

  request.setConfig(config);

  try {
    const response: DexHand = await new Promise<DexHand>((resolve, reject) => {
      grpcClient2.createDexHand(request, {}, (err, response) => {
        if (err) {
          console.error("Error in createDexHand:", err);
          reject(err);
        } else {
          console.log("Response from createDexHand:", response);
          resolve(response);
        }
      });
    });

    console.log("DexHand ID:", response.getId());
    // Additional asynchronous process after receiving the response.
    processDexHand(response);
    afterProcess(response.getId());

    return response.getId();
  } catch (error) {
    console.error("Failed to create DexHand:", error);
    throw error;
  }
};

// Example function to process the DexHand response.
const processDexHand = (response: any) => {
  console.log("Processing DexHand with ID:", response.getId());

  latestDexHandId = response.getId();
  // Simulate an asynchronous operation (e.g., updating UI, making further API calls, etc.)
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  // console.log("Processing complete for DexHand with ID:", response.getId());
};

const getDexHand = async () => {
  // const request = new GetDexHandRequest();
  // For demonstration, set an id or a name (oneof)
  // request.setId("aaaa");
  // await new Promise((resolve, reject) => {
  //   grpcClient2.getDexHand(request, {}, (err, response) => {
  //     if (err) {
  //       console.error("Error in getDexHand:", err);
  //       reject(err);
  //     } else {
  //       console.log("Response from getDexHand:", response);
  //       resolve(response);
  //     }
  //   });
  // });
};

const RobotControlButtons: React.FC = () => {
  const [, setRobotId] = useAtom(robotIdAtom);
  const [connectionStatus, setConnectionStatus] = useAtom(
    robotConnectionStatusAtom
  );
  const afterCreateDexHand = (id: string) => {
    setRobotId(id);
  };

  const afterConnect = () => {
    setConnectionStatus("connected");
  };

  const afterDisconnect = () => {
    setConnectionStatus("disconnected");
  };

  return (
    <Stack spacing={2} direction="column" sx={{ maxWidth: 200 }}>
      <MuiButton
        variant="contained"
        color="primary"
        onClick={() => connectDexHand(afterConnect)}
      >
        Connect
      </MuiButton>
      <MuiButton
        variant="contained"
        color="primary"
        onClick={() => disconnectDexHand(afterDisconnect)}
      >
        Disconnect
      </MuiButton>
      <MuiButton
        variant="contained"
        color="primary"
        onClick={() => enableDexHand()}
      >
        Enable Robot
      </MuiButton>
      <MuiButton
        variant="contained"
        color="primary"
        onClick={() => disableDexHand()}
      >
        Disable Robot
      </MuiButton>
      <ButtonGroup variant="contained" color="primary" fullWidth>
        <MuiButton onClick={() => createDexHand(afterCreateDexHand)}>
          Create
        </MuiButton>
        <MuiButton onClick={() => getDexHand()}>Get</MuiButton>
      </ButtonGroup>
    </Stack>
  );
};

export default RobotControlButtons;
