import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
    findAll(): string {
        return 'This action returns all cats';
    }

    findOne(id: string): string {
        return `This action returns a #${id} cat`;
    }
}
