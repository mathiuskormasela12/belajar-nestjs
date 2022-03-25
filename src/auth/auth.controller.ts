// ========== Import All Modules

import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

interface MyReq extends Request {
	app: {
		locals: {
			decode: string | null | undefined;
		};
	};
}

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	// Start writing logic of register
	@Post('register')
	public async register(@Body() dto: AuthDto, @Request() req: MyReq) {
		return await this.authService.register(dto, req);
	}

	// validation
	// @Post('register')
	// public register(
	// 	@Body('email') email: string,
	// 	@Body('password') password: string,
	// ) {
	// 	console.log(email, password);
	// 	return this.authService.register();
	// 	// return {
	// 	//   type: 'success',
	// 	//   message: 'This is a register endpoint',
	// 	// };
	// }

	// ambil req.body nest js style
	// @Post('register')
	// public register(@Body() dto: any) {
	// 	console.log(dto);
	// 	return this.authService.register();
	// 	// return {
	// 	//   type: 'success',
	// 	//   message: 'This is a register endpoint',
	// 	// };
	// }

	// ambil req.body express style
	// @Post('register')
	// public register(@Req() req: Request) {
	// 	console.log(req.body);
	// 	return this.authService.register();
	// 	// return {
	// 	//   type: 'success',
	// 	//   message: 'This is a register endpoint',
	// 	// };
	// }

	@Post('login')
	public login(@Body() dto: AuthDto) {
		return this.authService.login(dto);
		// return {
		//   type: 'success',
		//   message: 'This is a login endpoint',
		// };
	}
}
