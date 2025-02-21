// import { GrpcWebClientBase } from 'grpc-web';
import { DexHandServiceClient } from '../../proto/ts/dexhand/v1/dexhand_service_grpc_web_pb';
import { DexHandControlServiceClient } from '../../proto/ts/dexhand/v1/dexhand_control_service_grpc_web_pb';
import { ConnectDexHandRequest } from '../../proto/ts/dexhand/v1/dexhand_control_service_pb';

// Replace with the actual gRPC service definition and client
// For example:
// import { MyServiceClient } from './proto/my_service_grpc_web_pb';
// import { MyRequest, MyResponse } from './proto/my_service_pb';

let dexHandClient: DexHandServiceClient
let dexHandCtrlClient: DexHandControlServiceClient;

export const initializeGrpcClient = (serviceHost: string) => {
  // Replace MyServiceClient with the actual gRPC client constructor
  // client = new MyServiceClient(serviceHost);
  dexHandClient = new DexHandServiceClient('http://192.168.2.124:8080');
  dexHandCtrlClient = new DexHandControlServiceClient('http://192.168.2.124:8080');
  console.log('gRPC client initialized');
};

export const sendGrpcCommand = async (command: string): Promise<void> => {
  if (!dexHandClient || !dexHandCtrlClient) {
    throw new Error('gRPC client not initialized. Call initializeGrpcClient first.');
  }

  switch (command) {
    case 'enableDexHand':
        // await enableDexHand();
        break;
    case 'disableDexHand':
        break;
    case 'connectDexHand':
        await connectDexHand();
        break;
    default:
        break;
    }

  // Replace with the actual gRPC method call
  // For example:
  // const request = new MyRequest();
  // request.setCommand(command);

  // return new Promise((resolve, reject) => {
  //   client.myMethod(request, {}, (err: any, response: MyResponse) => {
  //     if (err) {
  //       console.error('gRPC error:', err);
  //       reject(err);
  //     } else {
  //       console.log('gRPC response:', response.getMessage());
  //       resolve();
  //     }
  //   });
  // });
  console.log(`Sending gRPC command: ${command}`);
  return Promise.resolve();
};

const connectDexHand = async () => {
    const request = new ConnectDexHandRequest();

    dexHandCtrlClient.connectDexHand(request, {}, (err, response) => {
        if (err) {
            console.error('Error sending command:', err);
        } else {
            console.log('Response from robot:', response);
        }
    });

    return Promise.resolve();

}