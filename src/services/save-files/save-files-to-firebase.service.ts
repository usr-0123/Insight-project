// export const saveToFirebaseService = async (): Promise<void> => {}

import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

// Path to your service account key file
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'your-bucket-name.appspot.com', // Replace with your bucket name
});

// Get a reference to Firebase Storage
const bucket = admin.storage().bucket();

// Path to the folder containing static files
const staticFilesFolder = path.join(__dirname, 'static-files'); // Adjust the folder path as needed

// Function to upload files
export async function uploadFiles(): Promise<object> {
    try {
        // Read all files from the folder
        const files = fs.readdirSync(staticFilesFolder);

        // Upload each file to Firebase Storage
        for (const file of files) {
            const filePath = path.join(staticFilesFolder, file);
            const fileStream = fs.createReadStream(filePath);

            // Create a reference to the file in Firebase Storage
            const storageFile = bucket.file(file);

            // Upload the file
            await new Promise((resolve) => {
                fileStream.pipe(storageFile.createWriteStream({
                    metadata: { contentType: getContentType(file) }, // Set content type based on file extension
                }))
            })
            .then(() => console.log(`File ${file} uploaded successfully.`))
            .catch(err => console.log(`Failed to upload the file: ${err}`));
        }

        return {message: "Files uploaded successfully."};
    } catch (error) {
        return Promise.reject({error});
    }
}

// Helper function to determine content type based on file extension
function getContentType(filename: string): string {
    const extension = path.extname(filename).toLowerCase();
    switch (extension) {
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.png':
            return 'image/png';
        case '.gif':
            return 'image/gif';
        case '.mp4':
            return 'video/mp4';
        case '.mp3':
            return 'audio/mpeg';
        case '.json':
            return 'application/json';
        default:
            return 'application/octet-stream'; // Default content type
    }
}