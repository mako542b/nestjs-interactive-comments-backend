import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserDocument } from './user.schema'
import { hash } from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(@InjectModel('UserSchema') private User: Model<UserDocument>){}

    async findOne(login: string, returnPassword: boolean = false) : Promise<UserDocument | undefined> {
        if(returnPassword) return await this.User.findOne({login}).select('password')
        return await this.User.findOne({login})
    }

    async newUser(login:string, password: string, avatar: string) {
        const hashedPassword = await hash(password, 4)
        const newUser = new this.User({login, password: hashedPassword, avatar})
        return await newUser.save()
    }

    async findAll() {
        const user = await this.User.find()
        return user
    }
}
