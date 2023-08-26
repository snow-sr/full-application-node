import { Controller, Get, Post, Req, Param } from '@nestjs/common';
import { Request } from 'express';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) { }

    @Get()
    findAll(@Req() request: Request): string {
        return this.catsService.findAll();
    }

    @Get(':id')
    findOne(@Param() params: any): string {
        return this.catsService.findOne(params.id);
    }
}
