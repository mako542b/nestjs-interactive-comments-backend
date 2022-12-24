import { Module } from '@nestjs/common'
import { SectionService } from './section.service'
import { SectionController } from './section.controller'
import { SectionSchema } from './section.schema'
import { MongooseModule } from '@nestjs/mongoose'


@Module({
    imports:[MongooseModule.forFeature([{name:'SectionSchema', schema: SectionSchema}])],
    providers:[SectionService],
    controllers:[SectionController],
})
export class SectionModule{}