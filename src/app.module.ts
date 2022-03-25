import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { UserModule } from './user/user.module';

@Module({
  // install AuthModule to our app module (main module)
  imports: [AuthModule, BookmarkModule, UserModule],
})
export class AppModule {}
