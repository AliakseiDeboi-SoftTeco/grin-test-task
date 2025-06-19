import { Module } from '@nestjs/common';
import {LiveCallModule} from "./live-call/live-call.module";
import {TaskModule} from "./task/task.module";
import {CommunicationModule} from "./communication/communication.module";
import {LikeModule} from "./like/like.module";
import {PatientModule} from "./patient/patient.module";
import {EmployeeModule} from "./employee/employee.module";

@Module({
    imports: [LiveCallModule, TaskModule, CommunicationModule, LikeModule, PatientModule, EmployeeModule],
})
export class AppModule {}