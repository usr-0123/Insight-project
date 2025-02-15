// Run the function
import {sendEmail} from "./services/send-email";

try {
    sendEmail();
} catch (error) {
    console.log(error);
}