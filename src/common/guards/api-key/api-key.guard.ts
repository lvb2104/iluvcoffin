import { IS_PUBLIC_KEY } from './../../decorators/public.decorator';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly configService: ConfigService,
    ) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        // look up metadata key and check if route is public
        // requires target object context and key
        const isPublic = this.reflector.get(
            IS_PUBLIC_KEY,
            context.getHandler(),
        );
        if (isPublic) return true;

        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request>();

        const authHeader = request.header('Authorization');
        return authHeader === this.configService.getOrThrow('API_KEY');
    }
}
