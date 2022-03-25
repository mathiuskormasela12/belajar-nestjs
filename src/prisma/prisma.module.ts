import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// agar prisma service jdi global
@Global()
@Module({
	providers: [PrismaService],
	// agar Prisma service bisa di pake di module lain (tpi kita mesti selalu import di module tujuan, klo gk jadiin prisma servie global aja)
	exports: [PrismaService],
})
export class PrismaModule {}
