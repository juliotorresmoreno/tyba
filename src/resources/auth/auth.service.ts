
import { Injectable } from '@nestjs/common';
import * as randomstring from 'randomstring';
import { SignInDto, SignUpDto } from './auth.dto';
import { Connection, Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import * as crypto from 'crypto';
import { RedisService } from 'src/components/redis/redis.service';
import * as createHttpError from 'http-errors';
import { SecureService } from 'src/components/secure/secure.service';

@Injectable()
export class AuthService {
    private usersRepository: Repository<User>;

    constructor(
        private readonly connection: Connection,
        private readonly secureService: SecureService,
        private readonly redisService: RedisService
    ) {
        this.usersRepository = this.connection.getRepository(User);
    }

    async hash(password: string) {
        return new Promise<string>((resolve, reject) => {
            const salt = crypto.randomBytes(16).toString("hex")

            crypto.scrypt(password, salt, 64, (err, derivedKey) => {
                if (err) reject(err);
                resolve(salt + ":" + derivedKey.toString('hex'))
            });
        })
    }

    async verify(password: string, hash: string) {
        return new Promise<boolean>((resolve, reject) => {
            const [salt, key] = hash.split(":")
            crypto.scrypt(password, salt, 64, (err, derivedKey) => {
                if (err) reject(err);
                resolve(key == derivedKey.toString('hex'))
            });
        })
    }

    async signIn(payload: SignInDto) {
        let exists = await this.usersRepository.findOne({
            email: payload.email
        });
        if (!exists) {
            throw new createHttpError.Unauthorized();
        };
        const pwd = this.secureService.createHash(payload.password);
        if (pwd !== exists.password) {
            throw new createHttpError.Unauthorized();
        }
        const sessionToken = await this.generateSessionToken(exists);

        return this.getSession(exists.id, sessionToken);
    }

    async signUp(payload: SignUpDto) {
        if (!payload.email && !payload.phone)
            throw new createHttpError.Unauthorized();

        let exists = await this.usersRepository.findOne({
            email: payload.email
        });
        if (exists) {
            throw new createHttpError.Unauthorized();
        };

        const pwd = this.secureService.createHash(payload.password);

        const result = await this.usersRepository.insert({
            ...payload,
            password: pwd,
            verified: true
        });

        const sessionToken = await this.generateSessionToken(result.raw[0]);

        return this.getSession(result.raw[0].id, sessionToken);
    }

    async getSession(id: number, sessionToken: string) {
        const session = await this.usersRepository.findOne(id, {
            select: [
                'id', 'name', 'last_name', 'email', 'photo_url'
            ]
        });
        return {
            session,
            token: sessionToken
        }
    }

    async deleteSession(sessionToken: string) {
        await this.redisService.delete(`session:${sessionToken}`);
    }

    async generateSessionToken(user: User) {
        const token = await this.generateRandomString(128);
        await this.redisService.set(`session:${token}`, user.id.toString());
        return token;
    }

    async generateRandomString(length: number): Promise<string> {
        return randomstring.generate({ length });
    }
}
