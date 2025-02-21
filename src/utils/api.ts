import { DexHandControlServiceClient } from "../../proto/ts/dexhand/v1/dexhand_control_service_grpc_web_pb";
import {
  EnableDexHandRequest,
  DisableDexHandRequest,
  ConnectDexHandRequest,
  DisconnectDexHandRequest,
  ChangeControlModeRequest,
  SetupModelRequest,
} from "../../proto/ts/dexhand/v1/dexhand_control_service_pb";
import { DexHandServiceClient } from "../../proto/ts/dexhand/v1/dexhand_service_grpc_web_pb";
import {
  CreateDexHandRequest,
  GetDexHandRequest,
  UpdateDexHandRequest,
  DeleteDexHandRequest,
  ListDexHandsRequest,
  DexHand,
} from "../../proto/ts/dexhand/v1/dexhand_service_pb";

// Instantiate the gRPC client (adjust the URL as needed for your gRPC-web proxy endpoint)
const grpcClient = new DexHandControlServiceClient("http://192.168.2.124:8080");
const grpcClient2 = new DexHandServiceClient("http://192.168.2.124:8080");

let latestDexHandId = "";

const enableDexHand = async () => {
  const request = new EnableDexHandRequest();
  request.setId(latestDexHandId);

  await new Promise((resolve, reject) => {
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
};

const disconnectDexHand = async () => {
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
};

const changeControlMode = async (mode: number) => {
  const request = new ChangeControlModeRequest();
  request.setDexhandId("aaaa");
  request.setControlMode(mode);
  await new Promise((resolve, reject) => {
    grpcClient.changeControlMode(request, {}, (err, response) => {
      if (err) {
        console.error("Error sending change mode command:", err);
        reject(err);
      } else {
        console.log("Response from change mode:", response);
        resolve(response);
      }
    });
  });
};

const setupModel = async () => {
  const request = new SetupModelRequest();
  request.setDexhandId("aaaa");
  request.setModelType(1); // e.g., MODEL_TYPE_IK
  await new Promise((resolve, reject) => {
    grpcClient.setupModel(request, {}, (err, response) => {
      if (err) {
        console.error("Error setting up model:", err);
        reject(err);
      } else {
        console.log("Response from setupModel:", response);
        resolve(response);
      }
    });
  });
};

// New Request Handlers for DexHandService:

const createDexHand = async () => {
  const request = new CreateDexHandRequest();
  // request.setConfig(yourConfig);
  try {
    const response = await new Promise<DexHand>((resolve, reject) => {
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
  const request = new GetDexHandRequest();
  // For demonstration, set an id or a name (oneof)
  request.setId("aaaa");
  await new Promise((resolve, reject) => {
    grpcClient2.getDexHand(request, {}, (err, response) => {
      if (err) {
        console.error("Error in getDexHand:", err);
        reject(err);
      } else {
        console.log("Response from getDexHand:", response);
        resolve(response);
      }
    });
  });
};

const updateDexHand = async () => {
  const request = new UpdateDexHandRequest();
  // Set properties to update (e.g., new config)
  // request.setDexHand(yourDexHandInstance);
  // request.setUpdateMask(yourFieldMask);
  await new Promise((resolve, reject) => {
    grpcClient2.updateDexHand(request, {}, (err, response) => {
      if (err) {
        console.error("Error in updateDexHand:", err);
        reject(err);
      } else {
        console.log("Response from updateDexHand:", response);
        resolve(response);
      }
    });
  });
};

const deleteDexHand = async () => {
  const request = new DeleteDexHandRequest();
  // Set the DexHand to delete (e.g., by id)
  // request.setDexHand(yourDexHandInstance);
  await new Promise((resolve, reject) => {
    grpcClient2.deleteDexHand(request, {}, (err, response) => {
      if (err) {
        console.error("Error in deleteDexHand:", err);
        reject(err);
      } else {
        console.log("Response from deleteDexHand:", response);
        resolve(response);
      }
    });
  });
};

const listDexHands = async () => {
  const request = new ListDexHandsRequest();
  await new Promise((resolve, reject) => {
    grpcClient2.listDexHands(request, {}, (err, response) => {
      if (err) {
        console.error("Error in listDexHands:", err);
        reject(err);
      } else {
        console.log("Response from listDexHands:", response.getDexHandsList());
        resolve(response);
      }
    });
  });
};

export {
  enableDexHand,
  disableDexHand,
  connectDexHand,
  disconnectDexHand,
  changeControlMode,
  setupModel,
  createDexHand,
  getDexHand,
  updateDexHand,
  deleteDexHand,
  listDexHands,
};
