import * as fs from "fs";
import * as path from "path";

/**
 * Creates a folder relative to the project root if it doesn't exist.
 * @param relativePath - The relative path from the project root.
 * @returns The absolute path of the created folder.
 */
export function createFolder(relativePath: string): string {
    const folderPath = path.join(process.cwd(), relativePath); // Resolve path from project root

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log(`✅ Folder created: ${folderPath}`);
    } else {
        console.log(`📂 Folder already exists: ${folderPath}`);
    }

    return folderPath;
}
