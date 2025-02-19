import { sendEmailService } from "./send-email.service";
import {describe} from "node:test";

jest.mock("./send-email.service", () => ({
    sendEmailService: jest.fn(),
}));

describe("Send Email Function", () => {
    it("Should return success response", async () => {
        const mockResponse = { success: true, message: "Email sent successfully!" };

        (sendEmailService as jest.Mock).mockResolvedValue(mockResponse);

        const result = await sendEmailService();

        expect(result).toEqual(mockResponse);
    });

    it("Should handle errors", async () => {
        const mockError = new Error("Email service failed");
        (sendEmailService as jest.Mock).mockRejectedValue(mockError);

        await expect(sendEmailService()).rejects.toThrow("Email service failed");
    });
});