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
import {
  isConnectedAtom,
  isEnabledAtom,
  robotConnectionStatusAtom,
  robotIdAtom,
} from "@/state/atoms";
import { useAtom } from "jotai";
import {
  createDexHand,
  connectDexHand,
  disableDexHand,
  disconnectDexHand,
  enableDexHand,
} from "@/lib/grpcClient";

const RobotControlButtons: React.FC = () => {
  const [robotId, setRobotId] = useAtom(robotIdAtom);
  const [connectionStatus, setConnectionStatus] = useAtom(
    robotConnectionStatusAtom
  );
  const [isEnabled, setIsEnabled] = useAtom(isEnabledAtom);
  const [isConnected, setIsConnected] = useAtom(isConnectedAtom);

  return (
    <Stack spacing={2} direction="column" sx={{ maxWidth: 200 }}>
      <MuiButton
        variant="contained"
        color="primary"
        onClick={async () => {
          await connectDexHand(robotId);
          setIsConnected(true);
        }}
      >
        Connect
      </MuiButton>
      <MuiButton
        variant="contained"
        color="primary"
        onClick={async () => {
          await disconnectDexHand(robotId);
          setIsConnected(false);
        }}
      >
        Disconnect
      </MuiButton>
      <MuiButton
        variant="contained"
        color="primary"
        onClick={async () => {
          await enableDexHand(robotId);
          setIsEnabled(true);
        }}
      >
        Enable Robot
      </MuiButton>
      <MuiButton
        variant="contained"
        color="primary"
        onClick={async () => {
          await disableDexHand(robotId);
          setIsEnabled(false);
        }}
      >
        Disable Robot
      </MuiButton>
      <ButtonGroup variant="contained" color="primary" fullWidth>
        <MuiButton
          onClick={async () => {
            var response = await createDexHand();
            console.log("Created robot with ID:", response.getId());
            setRobotId(response.getId());
          }}
        >
          Create
        </MuiButton>
        <MuiButton onClick={() => {}}>Get</MuiButton>
      </ButtonGroup>
    </Stack>
  );
};

export default RobotControlButtons;
