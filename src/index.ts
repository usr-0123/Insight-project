import {createFolder} from "./utilis/folder";
import {logger} from "./utilis/logger";
import {createEmptyJsonFile} from "./utilis/file";
import {sendEmailService} from "./services/send-email/send-email.service";

logger.info("Starting service request");

logger.info("Creating folder for saving tests");

// Create a folder and a file named output.json to save the output JSON file
(async () => {
    try {
        const resultsFolder = createFolder("output");

        if (resultsFolder.success) {
            const newFile = createEmptyJsonFile(resultsFolder.data.value, "output");
            newFile.success ? logger.info(newFile.message) : logger.error(newFile.message);
        } else {
            logger.error(resultsFolder.message);
        }

        return;
    } catch (error) {
        logger.error(`An error occurred while creating folder: ${error}`);
    }
})();

logger.info("Send email service request");
// Run the tests
(async () => {
    try {
        const response = await sendEmailService();
        response.success ? logger.info(response.message) : logger.error(response.message);
        return response;
    } catch (error) {
        logger.error(error);
        return error;
    }
})();