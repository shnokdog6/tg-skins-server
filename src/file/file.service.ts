import { Injectable } from "@nestjs/common";
import fsExists from "fs.promises.exists";
import fs from "fs/promises";
import { resolve, join } from "path";
import { v4 as uuidV4 } from "uuid";

@Injectable()
export class FileService {
    public async saveImage(file: Express.Multer.File): Promise<string | undefined> {
        try {
            const fileExtension = file.originalname.split(".")[1];
            const fileName = `${uuidV4()}.${fileExtension}`;
            const filePath = resolve(__dirname, "..", "public");
            const pathExist = await fsExists(filePath);

            if (!pathExist) {
                await fs.mkdir(filePath, { recursive: true });
            }
            await fs.writeFile(join(filePath, fileName), file.buffer);

            return fileName;
        } catch (e) {
            console.log(e);
        }
    }
}
