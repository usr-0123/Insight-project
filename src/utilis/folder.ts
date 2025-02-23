import * as fs from "fs";
import * as path from "path";
import {ServiceResponse} from "../models/service.response";
import {DateFormatter} from "./date-time";

// Date formatting class
const formatter = new DateFormatter(new Date());

/**
 * Creates a folder relative to the project root if it doesn't exist.
 * @param relativePath - The relative path from the project root.
 * @returns The absolute path of the created folder.
 */
export function createFolder(relativePath: string): ServiceResponse {
    const folderPath = path.join(process.cwd(), relativePath);

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });

        return {
            success: true,
            time: formatter.format(),
            data: {value: folderPath},
            message: `✅ Folder created successfully.`,
        }

    } else {
        return {
            success: true,
            time: formatter.format(),
            data: {value: folderPath},
            message: `📂 Folder is already in existance.`
        }
    }
}
