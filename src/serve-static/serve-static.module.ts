import { ServeStaticModule as SSM } from "@nestjs/serve-static";
import { join } from "path";

export const ServeStaticModule = SSM.forRoot({
    rootPath: join(__dirname, "..", "public"),
});
