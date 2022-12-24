import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserDocument } from './user.schema'

@Injectable()
export class UsersService {
    constructor(@InjectModel('UserSchema') private User: Model<UserDocument>){}

    async findOne(login: string) : Promise<UserDocument | undefined> {
        const user = await this.User.findOne({login})
        return user
    }

    async newUser(login:string, password: string) {
        const newUser = new this.User({login, password})
        return await newUser.save()
    }

    async findAll() {
        const user = await this.User.find()
        return user
    }
}
