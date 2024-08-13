import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private service: UsersService) { }
    @Get()
    findAll() {
        return this.service.findAll()
    }

    //@Get('interns')
    //findAllIntern() {
    //  return [];  // Return all interns
    // }

    @Get(':id')
    findOne(@Param('id') id: any) {
        return this.service.findbyId(+id);  // Return user by ID
    }

    @Post()
    create(@Body() user: { name: string, email: string,password:string }) {
        return this.service.create(user);  // Return the user data for testing
    }

    @Delete(':id')
    remove(@Param('id') id: any) {
        return this.service.remove(+id);  // Return the user data for testing

    }

    @Put(':id')
    update(@Param('id') id: number, @Body() userupdate: { name?: string, email?: string }) {
        return this.service.update(+id, userupdate);  // Return user by ID
    }

  

}
