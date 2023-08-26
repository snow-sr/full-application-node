import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class CatsService {

    async findAll() {
        return await prisma.cat.findMany();
    }

    async findOne(id: string) {
        let idCat = parseInt(id);
        return await prisma.cat.findUnique({
            where: { id: idCat },
        });
    }

    async create(cat: any) {
        return await prisma.cat.create({
            data: cat,
        });
    }

    async update(id: string, cat: any) {
        let idCat = parseInt(id);
        return await prisma.cat.update({
            where: { id: idCat },
            data: cat,
        });
    }

    async delete(id: string) {
        let idCat = parseInt(id);
        return await prisma.cat.delete({
            where: { id: idCat },
        });
    }


}
