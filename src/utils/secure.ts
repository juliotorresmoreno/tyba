
import { IncomingMessage } from "http";
import * as createHttpError from "http-errors";
import { RequestWithSession } from "src/types/http";

export function Authentication(): MethodDecorator {
    return function (
        target: Object,
        key: string | symbol,
        descriptor: PropertyDescriptor
    ) {
        const childFunction: Function = descriptor.value;

        descriptor.value = function value(...args: any[]) {
            const req: RequestWithSession = args
                .find(arg => arg instanceof IncomingMessage);

            if (!req || !req.session)
                throw new createHttpError.Unauthorized();

            return childFunction.apply(this, args);
        };
        return descriptor;
    }
}
