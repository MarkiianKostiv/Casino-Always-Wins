import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/users/users.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async registerNewUser(username: string, email: string, password: string) {
    const user = new Users();
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);

    user.username = username;
    user.email = email;
    user.password = hash;
    const savedUser = await this.usersRepository.save(user);

    return this.generateUserTokenResponse(savedUser);
  }

  async logInUser(email: string, pass: string): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateUserTokenResponse(user);
  }

  private async generateUserTokenResponse(user: Users): Promise<any> {
    const payload = { sub: user.id, username: user.username };
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '60m',
    });
    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    const { password, ...userData } = user;
    return {
      ...userData,
      access_token,
      refresh_token,
    };
  }

  async checkAccessToken(accessToken: string) {
    try {
      const token = this.jwtService.verify(accessToken);
      const currentTime = Math.floor(Date.now() / 1000);

      if (token.exp < currentTime) {
        return { token_status: false, message: 'Token expired' };
      }

      return { token_status: true };
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        return { token_status: false, message: 'Token expired' };
      } else if (e.name === 'JsonWebTokenError') {
        return { token_status: false, message: 'Invalid token' };
      } else {
        throw new UnauthorizedException('Invalid token');
      }
    }
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.usersRepository.findOne({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }

      return this.generateUserTokenResponse(user);
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async getUserData(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.usersRepository.findOne({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return user;
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
