import { teleoperationService } from "./teleoperation/motion/service";

export const startSocketServer = (socket,robot) =>{
    teleoperationService(socket,robot)
}