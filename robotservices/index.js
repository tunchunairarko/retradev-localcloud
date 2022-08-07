import { pingTestingService } from "./core/connectivity/service";
import { batteryService } from "./sensors/battery/service";
import { sonarService } from "./sensors/sonar/service";
import { teleoperationService } from "./teleoperation/motion/service";

export const startSocketServer = (socket,robot) =>{
    teleoperationService(socket, robot);
    interactionService(socket, robot);
    pingTestingService(socket,robot);
    sonarService(socket,robot);
    batteryService(socket,robot);
}