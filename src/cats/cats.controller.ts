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
    findOne(@Param() params: any) {
        return this.catsService.findOne(params.id);
    }

    @Post()
    create(@Req() request: Request) {
        return this.catsService.create(request.body);
    }

    @Patch(':id')
    update(@Param() params: any, @Req() request: Request) {
        return this.catsService.update(params.id, request.body);
    }

    @Delete(':id')
    delete(@Param() params: any) {
        return this.catsService.delete(params.id);
    }


}
