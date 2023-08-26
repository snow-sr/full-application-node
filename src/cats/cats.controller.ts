import { Controller, Get, Post, Req, Param, Patch, Delete } from '@nestjs/common';
import { Request } from 'express';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) { }

    @Get()
    async findAll(@Req() request: Request) {
        return await this.catsService.findAll();
    }

    @Get(':id')
    async findOne(@Param() params: any) {
        return await this.catsService.findOne(params.id);
    }

    @Post()
    async create(@Req() request: Request) {
        return await this.catsService.create(request.body);
    }

    @Patch(':id')
    async update(@Param() params: any, @Req() request: Request) {
        return await this.catsService.update(params.id, request.body);
    }

    @Delete(':id')
    async delete(@Param() params: any) {
        return await this.catsService.delete(params.id);
    }


}
