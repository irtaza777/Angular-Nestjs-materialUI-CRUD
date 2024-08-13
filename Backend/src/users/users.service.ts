import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService {
  private prisma = new PrismaClient();

  findAll(): any {
    return this.prisma.user.findMany();
  }


  findbyId(id: any) {

    return this.prisma.user.findUnique({
      where: { id: id }
    })

  }

  create(data: { name: string, email: string, password: string }) {
    return this.prisma.user.create({
      data
    });
  }

  remove(id: any) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
  update(id: number, data: { name?: string; email?: string }) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  
}