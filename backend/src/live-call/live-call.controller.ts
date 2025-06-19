import { Controller, Get, Query } from '@nestjs/common';
import {LiveCallService} from "./live-call.service";
import {LiveCallQueryDTO} from "./dto/live-call-query.dto";

@Controller('live-calls')
export class LiveCallController {
    constructor(private readonly liveCallService: LiveCallService) {}

    @Get()
    public findAll(@Query() query: LiveCallQueryDTO) {
        return this.liveCallService.findAll(query);
    }
}
