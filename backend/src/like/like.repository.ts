import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import {LikeDTO} from "./dto/like.dto";

@Injectable()
export class LikeRepository {
    private readonly likes: LikeDTO[];

    constructor() {
        const raw = readFileSync(
            join(__dirname, '..', '..', 'data', 'dataset.json'),
            'utf8',
        );
        this.likes = JSON.parse(raw).likes;
    }

    public getLikes(): LikeDTO[] {
        return this.likes;
    }
}