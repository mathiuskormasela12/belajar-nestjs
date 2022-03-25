// =========== Import All Modules

import { Body, Injectable } from '@nestjs/common';
// this happens because we already run 'npx prisma generate'
import { User, Bookmark } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService) {}
	public async register(@Body() dto: AuthDto) {
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

	public login() {
		return {
			type: 'success',
			message: 'This is a login endpoint',
		};
	}
}
