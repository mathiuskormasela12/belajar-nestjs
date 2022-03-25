// =========== Import All Modules

import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
	public register() {
		return {
			type: 'success',
			message: 'This is a register endpoint',
		};
	}

	public login() {
		return {
			type: 'success',
			message: 'This is a login endpoint',
		};
	}
}
