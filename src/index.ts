import {sendEmailService} from "./services/send-email/send-email.service";
import {createFolder} from "./utilis/folder";
import path from "path";

// Create a folder to save the output JSON file
(async () => {
    try {
        const timestamp = new Date().toISOString().split("T")[0].replace(/-/g, "");
        const resultsFolder = createFolder(`test_results/${timestamp}`);
        const filePath = path.join(resultsFolder, "example.json");
        console.log(filePath);

        createFolder(resultsFolder);
    } catch (error) {
        console.log(error);
    }
})();

// Saving the test outputs into the online storage
// (async () => {})();

// Run the tests
(async () => {
    try {
        const response = await sendEmailService()
        return response;
    } catch (error) {
        return error;
    }
})();