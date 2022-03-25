// ========== Import All Modules

import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
// import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';

@Global()
@Module({
	// agar Prisma module bisa di pake di auth module
	// imports: [PrismaModule],
	imports: [JwtModule.register({})],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule implements NestModule {
	public configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes('/auth/register');
	}
}

/*
	========== Belajar Modules ==========

	Module berfungsi untuk memecah aplikasi
	kita menjadi lebih kecil. Misal
	Kita punya dua bagian endpoint, yaitu
	endpoint auth dan user. Dimana endpoint 
	auth memiliki dua endpoint di dalamnya yaitu
	login dan register, sedangkan user memilki
	dua endpoint juga, misal update user dan
	upload foto. Biasanya kita bisa menulisnya
	didalam satu file, namun jika
	dengan module kita bisa memecahnya kedalam beberapa
	file.

	Rumus :
	import { Module } from '@nestjs/common';
	import { NamaControllerMuController } from './auth.controller';
	import { NamaServiceMuService } from './auth.service';

	@Module({
		controllers: [NamaControllerMuController, ...],
		providers: [NamaControllerMuController, ...],
	})
	export class NamaModuleMuModule {}

	atau bisa menggunakna command-line
	nest g module namamodule
*/
