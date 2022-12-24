import { Get, Controller, Query, Post, Body, Delete, Patch, Req } from '@nestjs/common'
import { UsersService } from './users.service'

@Controller('login')
export class UserController {
    constructor(private userService: UsersService){}

    @Get()
    async getSection() {
        return await this.userService.findAll() 
    }
    
    @Post('register')
    async addComment(@Body('login') login: string, @Body('password') password: string ) {
        return await this.userService.newUser(login, password)
    }

   
}

