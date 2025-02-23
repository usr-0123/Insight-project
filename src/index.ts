import {sendEmailService} from "./services/send-email/send-email.service";
import {createFolder} from "./utilis/folder";
import path from "path";
import {uploadFiles} from "./services/save-files/save-files-to-firebase.service";
import {logger} from "./utilis/logger";

logger.info("Starting service request");

logger.info("Creating folder for saving tests");

// Create a folder to save the output JSON file
(async () => {
    try {
        const timestamp = new Date().toISOString().split("T")[0].replace(/-/g, "");
        const resultsFolder = createFolder(`test_results/${timestamp}`);
        const filePath = path.join(resultsFolder, "example.json");
        console.log(`The response ============================================= \n${filePath}\n =============================================`);

        createFolder(resultsFolder);
    } catch (error) {
        console.log(`The error ============================================= \n${error}\n =============================================`);
    }
})();

logger.info("Saving test results to cloud service");
// Saving the test outputs into the online storage
// (async () => {
//     try {
//         const response = await uploadFiles()
//         return response;
//     } catch (error) {
//         console.log(error);
//     }
// })();

logger.info("Send email service request");
// Run the tests
(async () => {
    try {
        const response = await sendEmailService()
        return response;
    } catch (error) {
        return error;
    }
})();


/////////////////////////////////////////////////
// Run the jobs then transfer the files from the output file into the destination folder
// Save the runs into the firebase storage.