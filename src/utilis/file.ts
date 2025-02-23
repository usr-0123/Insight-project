import * as path from "path";
import * as fs from "node:fs";
import {ServiceResponse} from "../models/service.response";
import {DateFormatter} from "./date-time";

// Date formatting class
const formatter = new DateFormatter(new Date());

/**
 * Creates an empty JSON file in the specified folder.
 * @param folderPath - The absolute path of the folder where the JSON file will be created.
 * @param fileName - The name of the JSON file (without extension).
 */
export function createEmptyJsonFile(folderPath: string, fileName: string): ServiceResponse {
    try {
        const filePath = path.join(folderPath, `${fileName}.json`);

        // Write an empty JSON object to the file
        fs.writeFileSync(filePath, JSON.stringify({}), "utf8");
        console.log(`✅ Empty JSON file created: ${filePath}`);

        return {
            success: true,
            time: formatter.format(),
            data: {value: fileName},
            message: `✅ Empty JSON file created: ${filePath}`
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            time: formatter.format(),
            data: {value: ""},
            message: `Failed to create file with error: ${error}`
        }
    }
}