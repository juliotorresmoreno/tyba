
import { Body, Controller, Res, Get, Post, Request, UsePipes, Delete } from '@nestjs/common';
import { JoiValidationPipe } from 'src/pipes/joiValidationPipe';
import { RequestWithSession } from 'src/types/http';
import { Authentication } from 'src/utils/secure';
import { SignInDto, SignUpDto } from './auth.dto';
import { AuthService } from './auth.service';
import { signInSchema, signUpSchema } from './joiSchema';
import Express from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('sign-up')
    @UsePipes(new JoiValidationPipe(signUpSchema))
    postSignUp(@Body() payload: SignUpDto) {
        return this.authService.signUp(payload);
    }

    @Post('sign-in')
    @UsePipes(new JoiValidationPipe(signInSchema))
    postSignIn(@Body() payload: SignInDto) {
        return this.authService.signIn(payload);
    }

    @Get('session')
    @Authentication()
    getSession(@Request() req: RequestWithSession) {
        return this.authService.getSession(req.session.id, req.token);
    }

    @Delete('session')
    @Authentication()
    async deleteSession(@Request() req: RequestWithSession, @Res() res: Express.Response) {
        await this.authService.deleteSession(req.token);
        res.status(204);
        res.end();
    }
}
