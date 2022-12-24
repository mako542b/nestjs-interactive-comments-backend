import { Injectable, NotFoundException } from '@nestjs/common'
import { TestRequestdto } from './TestRequestdto'
import { Section, SectionDocument } from './section.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'


@Injectable()
export class SectionService {

    constructor(@InjectModel('SectionSchema') private SectionModel: Model<SectionDocument>) {}

    // private comments: TestRequestdto[] = []

    async provideSection(name:string): Promise<Section[]> {
        const sections = await this.SectionModel.find()
        return sections
    }

    async addCommentService(message: TestRequestdto): Promise<Section> {
        let {user, user2} = message
        let section = new this.SectionModel({user, user2})
        return await section.save()
    }

    async deleteSection(id:string): Promise<Section> {
        const removed = await this.SectionModel.findByIdAndDelete(id)
        if(!removed) throw new NotFoundException('id doesn\'t exist')
        return removed
    }

    async modifySection(id:string, newMessage: TestRequestdto): Promise<Section> {
        const messageToUpdate = await this.SectionModel.findById(id)
        const { user, user2 } = newMessage
        if(user) messageToUpdate.user = user 
        if(user2) messageToUpdate.user2 = user2
        return await messageToUpdate.save()
        
    }
}