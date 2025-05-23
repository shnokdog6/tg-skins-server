import { ValidationPipe, VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";

(async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix("api")
        .enableCors({
            origin: true,
            credentials: true,
        });
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );
    await app.listen(process.env.PORT ?? 3000);
})();
