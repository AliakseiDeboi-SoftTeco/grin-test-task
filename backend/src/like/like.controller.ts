import { Controller, Get, Query } from '@nestjs/common';
import {LikeService} from "./like.service";
import {LikeQueryDTO} from "./dto/like-query.dto";

@Controller('likes')
export class LikeController {
    constructor(private readonly likeService: LikeService) {}

    @Get()
    public findAll(@Query() query: LikeQueryDTO) {
        return this.likeService.findAll(query);
    }
}
