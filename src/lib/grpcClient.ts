// import { GrpcWebClientBase } from 'grpc-web';
import { DexHandServiceClient } from '../../proto/ts/dexhand/v1/dexhand_service_grpc_web_pb';
import { DexHandControlServiceClient } from '../../proto/ts/dexhand/v1/dexhand_control_service_grpc_web_pb';
import { ConnectDexHandRequest, GetJointStateRequest, GetStatusRequest, JointState, SetJointRequest, SetPoseRequest, Status } from '../../proto/ts/dexhand/v1/dexhand_control_service_pb';
import { CreateDexHandRequest, DexHand, DexHandConfig, GetDexHandRequest } from '../../proto/ts/dexhand/v1/dexhand_service_pb';
import { ArmType, HandType, Side } from '../../proto/ts/dexhand/v1/common_pb';
import { gRPCDevtoolsStreamInterceptors, gRPCDevtoolsUnaryInterceptors } from '@/utils/grpc-devtools';

// Replace with the actual gRPC service definition and client
// For example:
// import { MyServiceClient } from './proto/my_service_grpc_web_pb';
// import { MyRequest, MyResponse } from './proto/my_service_pb';

let dexHandClient: DexHandServiceClient
let dexHandCtrlClient: DexHandControlServiceClient;

export const initializeGrpcClient = (serviceHost: string = "192.168.2.124") => {
  // Replace MyServiceClient with the actual gRPC client constructor
  // client = new MyServiceClient(serviceHost);
const serviceUrl = `http://${serviceHost}:8080`;
dexHandClient = new DexHandServiceClient(serviceUrl, null, {unaryInterceptors: gRPCDevtoolsUnaryInterceptors,
    streamInterceptors: gRPCDevtoolsStreamInterceptors,});
dexHandCtrlClient = new DexHandControlServiceClient(serviceUrl, null,{unaryInterceptors: gRPCDevtoolsUnaryInterceptors,
    streamInterceptors: gRPCDevtoolsStreamInterceptors,});
console.log('gRPC client initialized');
};



export const connectDexHand = async (id: string) => {
    const request = new ConnectDexHandRequest();

    request.setId(id);

    var _ = await new Promise((resolve, reject) => {
        dexHandCtrlClient.connectDexHand(request, {}, (err, response) => {
            if (err) {
                console.error('Error sending command:', err);
                reject(err);
            } else {
                console.log('Response from robot:', response);
                resolve(null);
            }
        });
    });
}

export const disconnectDexHand = async (id: string) => {
    const request = new ConnectDexHandRequest();

    request.setId(id);

    var _ = await new Promise((resolve, reject) => {
        dexHandCtrlClient.disconnectDexHand(request, {}, (err, response) => {
            if (err) {
                console.error('Error sending command:', err);
                reject(err);
            } else {
                console.log('Response from robot:', response);
                resolve(null);
            }
        });
    });
}

export const enableDexHand = async (id: string) => {
    const request = new ConnectDexHandRequest();

    request.setId(id);

    var _ = await new Promise((resolve, reject) => {
        dexHandCtrlClient.enableDexHand(request, {}, (err, response) => {
            if (err) {
                console.error('Error sending command:', err);
                reject(err);
            } else {
                console.log('Response from robot:', response);
                resolve(null);
            }
        });
    });
}

export const disableDexHand = async (id: string) => {
    const request = new ConnectDexHandRequest();

    request.setId(id);

    return new Promise((resolve, reject) => {
        dexHandCtrlClient.disableDexHand(request, {}, (err, response) => {
            if (err) {
                console.error('Error sending command:', err);
                reject(err);
            } else {
                console.log('Response from robot:', response);
                resolve(null);
            }
        });
    });
}

export const createDexHand = async () => {
    const request = new CreateDexHandRequest();
    const config = new DexHandConfig();

    config.setHandType(HandType.HAND_TYPE_INSPIRE);
    config.setArmType(ArmType.ARM_TYPE_PIPER);
    config.setSide(Side.SIDE_RIGHT);

    request.setConfig(config);

    return new Promise<DexHand>((resolve, reject) => {
        dexHandClient.createDexHand(request, {}, (err, response) => {
            if (err) {
                console.error('Error sending command:', err);
                reject(err);
            } else {
                console.log('Response from robot:', response);
                resolve(response);
            }
        });
    });
}

export const setPose = async (id: string, poses: Array<number>) => {
    const request = new SetPoseRequest();

    request.setDexhandId(id);
    request.setNumPoses(poses.length);
    request.setPosesList(poses);

    return new Promise((resolve, reject) => {
        dexHandCtrlClient.setPose(request, {}, (err, response) => {
            if (err) {
                console.error('Error sending command:', err);
                reject(err);
            } else {
                console.log('Response from robot:', response);
                resolve(response);
            }
        });
    });
}

export const setJoint = async (id: string, angles: Array<number>) => {
    const request = new SetJointRequest();

    request.setDexhandId(id);
    request.setNumAngles(angles.length);
    request.setAnglesList(angles);

    return new Promise((resolve, reject) => {
        dexHandCtrlClient.setJoint(request, {}, (err, response) => {
            if (err) {
                console.error('Error sending command:', err);
                reject(err);
            } else {
                console.log('Response from robot:', response);
                resolve(response);
            }
        });
    });
}

export const getStatus = async (id: string) => {
    const request = new GetJointStateRequest();

    request.setDexhandId(id);
    
    return new Promise<JointState>((resolve, reject) => {
        dexHandCtrlClient.getJointState(request, {}, (err, response) => {
            if (err) {
                console.error('Error sending command:', err);
                reject(err);
            } else {
                // console.log('Response from robot:', response);
                resolve(response);
            }
        });
    });
}