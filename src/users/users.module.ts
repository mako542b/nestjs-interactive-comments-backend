import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from './user.schema'
import { UserController } from './user.controllers'

@Module({
  imports:[MongooseModule.forFeature([{name:'UserSchema', schema: UserSchema}])],
  providers: [UsersService],
  exports: [UsersService, MongooseModule.forFeature([{name:'UserSchema', schema: UserSchema}])],
  controllers: [UserController]
})
export class UsersModule {}
