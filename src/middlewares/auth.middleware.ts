import {
	Injectable,
	NestMiddleware,
	Request,
	Response,
	Next,
	InternalServerErrorException,
	BadRequestException,
	ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { NextFunction } from 'express';

interface MyReq extends Request {
	app: {
		locals: {
			decode: string | null | undefined;
		};
	};
	headers: any;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	constructor(private jwt: JwtService, private config: ConfigService) {}
	public async use(
		@Request() req: MyReq,
		@Response() res: Response,
		@Next() next: NextFunction,
	) {
		const token = req.headers.authorization;

		if (token) {
			try {
				const decode = await this.jwt.verify(token, {
					secret: this.config.get('SECRET'),
				});
				req.app.locals.decode = decode;
				next();
			} catch (error) {
				throw new InternalServerErrorException(error.message);
			}
		} else {
			throw new ForbiddenException('gagal');
		}
	}
}
