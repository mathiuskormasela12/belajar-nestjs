// =========== Import All Modules

import {
	Body,
	Injectable,
	Request,
	InternalServerErrorException,
} from '@nestjs/common';
// this happens because we already run 'npx prisma generate'
import { User, Bookmark } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

interface MyReq extends Request {
	app: {
		locals: {
			decode: string | null | undefined;
		};
	};
}

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService,
		private config: ConfigService,
	) {}
	public async register(@Body() dto: AuthDto, @Request() req: MyReq) {
		console.log(req.app.locals.decode);
		try {
			const isExists = await this.prisma.user.findFirst({
				where: {
					email: dto.email,
				},
			});

			if (isExists) {
				return {
					type: 'failed',
					message: 'The email already in used',
				};
			}

			try {
				const hashed = await argon.hash(dto.password);
				try {
					const results = await this.prisma.user.create({
						data: {
							...dto,
							password: hashed,
						},
					});

					delete results.password;

					return {
						type: 'success',
						message: 'The use has been created successfully',
						data: results,
					};
				} catch (err) {
					return {
						type: 'error',
						message: err.message,
					};
				}
			} catch (err) {
				return {
					type: 'error',
					message: err.message,
				};
			}
		} catch (err) {
			return {
				type: 'error',
				message: err.message,
			};
		}
	}

	public async login(@Body() dto: AuthDto) {
		try {
			const user = await this.prisma.user.findUnique({
				where: { email: dto.email },
			});

			if (!user || !(await argon.verify(user.password, dto.password))) {
				return {
					type: 'failed',
					message: 'username or password is wrong',
				};
			}

			const token = this.jwt.sign(
				{
					id: user.id,
				},
				{
					secret: this.config.get('SECRET'),
					expiresIn: '1m',
				},
			);

			return {
				type: 'success',
				message: 'Login successfully',
				token,
			};
		} catch (err) {
			throw new InternalServerErrorException(err.message);
		}
	}
}
