import { sendEmailService } from "./services/send-email/send-email.service";
import {describe} from "node:test";

jest.mock("./services/send-email/send-email.service", () => ({
    sendEmailService: jest.fn(),
}));

describe("Function to call the send email service", () => {
    it ("Should call the send email service", async () => {
        const mockResponse = { success: true, message: "Function triggered successfuly!" };
        (sendEmailService as jest.Mock).mockResolvedValue(mockResponse);

        const result = await sendEmailService();
        expect(result).toEqual(mockResponse);
    });

    it('Should handle errors', async () => {
        const mockError = new Error("Failed to trigger send email Function!");
        (sendEmailService as jest.Mock).mockRejectedValue(mockError);

        await expect(sendEmailService()).rejects.toThrow("Failed to trigger send email Function.");
    });
});