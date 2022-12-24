import { Get, Controller, Query, Post, Body, Delete, Patch, Req } from '@nestjs/common'
import { SectionService } from './section.service'
import { TestRequestdto } from './TestRequestdto'
import { Section } from './section.schema'
import { Request } from 'supertest'

@Controller('section')
export class SectionController {
    constructor(private sectionService: SectionService){}
    @Get()
    async getSection(@Query('section') section, @Req() req: Request): Promise<Section[]> {
        return await this.sectionService.provideSection(section) 
    }
    @Post()
    async addComment(@Body() testRequestdto: TestRequestdto ): Promise<Section> {
        return await this.sectionService.addCommentService(testRequestdto)
    }

    @Delete()
    async deleteById(@Query('id') id: string): Promise<Section> {
        return await this.sectionService.deleteSection(id)
    }

    @Patch()
    async modify(@Query('id') id:string, @Body() testRequestdto: TestRequestdto): Promise<Section> {
        return await this.sectionService.modifySection(id, testRequestdto)
    }
}

