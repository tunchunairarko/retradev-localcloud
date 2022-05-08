import { teleoperationService } from "./teleoperation/service";

export const startSocketServer = (socket) =>{
    teleoperationService(socket)
}