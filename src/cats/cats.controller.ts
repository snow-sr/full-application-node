import { Controller, Get, Post, Req, Param } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
    @Get()
    findAll(@Req() request: Request): string {
        return 'This action will returns all cats';
    }

    @Get(':id')
    findOne(@Param() params: any): string {
        return `This action returns a #${params.id} cat`;
    }
}
