# Github actions API endpoints.

---

## **🔹 1. Get a List of Workflows in a Repository**
**Endpoint:**
```http
GET /repos/{owner}/{repo}/actions/workflows
```
**Example Request (cURL):**
```sh
curl -H "Authorization: token YOUR_GITHUB_TOKEN" \
     -H "Accept: application/vnd.github.v3+json" \
     https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/actions/workflows
```
**Response:**  
Returns a list of workflows along with their **workflow IDs**.

---

## **🔹 2. Get a Specific Workflow by ID**
**Endpoint:**
```http
GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}
```
**Example Request:**
```sh
curl -H "Authorization: token YOUR_GITHUB_TOKEN" \
     -H "Accept: application/vnd.github.v3+json" \
     https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/actions/workflows/123456
```
*(Replace `123456` with the actual workflow ID.)*

---

## **🔹 3. Trigger a Workflow Dispatch (Manually Run a Workflow)**
**Endpoint:**
```http
POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches
```
**Example Request:**
```sh
curl -X POST -H "Authorization: token YOUR_GITHUB_TOKEN" \
     -H "Accept: application/vnd.github.v3+json" \
     -H "Content-Type: application/json" \
     --data '{"ref": "main"}' \
     https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/actions/workflows/email.yml/dispatches
```
**Notes:**
- This triggers a workflow **manually**.
- The `"ref": "main"` specifies which branch to run the workflow on.

---

## **🔹 4. Get a List of Workflow Runs**
**Endpoint:**
```http
GET /repos/{owner}/{repo}/actions/runs
```
**Example Request:**
```sh
curl -H "Authorization: token YOUR_GITHUB_TOKEN" \
     -H "Accept: application/vnd.github.v3+json" \
     https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/actions/runs
```
**Response:**  
Lists all workflow runs, including **status, conclusion, and timestamps**.

---

## **🔹 5. Get a Specific Workflow Run**
**Endpoint:**
```http
GET /repos/{owner}/{repo}/actions/runs/{run_id}
```
**Example Request:**
```sh
curl -H "Authorization: token YOUR_GITHUB_TOKEN" \
     -H "Accept: application/vnd.github.v3+json" \
     https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/actions/runs/987654
```
*(Replace `987654` with your actual workflow run ID.)*

---

## **🔹 6. Cancel a Running Workflow**
**Endpoint:**
```http
POST /repos/{owner}/{repo}/actions/runs/{run_id}/cancel
```
**Example Request:**
```sh
curl -X POST -H "Authorization: token YOUR_GITHUB_TOKEN" \
     -H "Accept: application/vnd.github.v3+json" \
     https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/actions/runs/987654/cancel
```
*(Replace `987654` with your actual workflow run ID.)*

---

## **🔹 7. Re-run a Failed Workflow Run**
**Endpoint:**
```http
POST /repos/{owner}/{repo}/actions/runs/{run_id}/rerun
```
**Example Request:**
```sh
curl -X POST -H "Authorization: token YOUR_GITHUB_TOKEN" \
     -H "Accept: application/vnd.github.v3+json" \
     https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/actions/runs/987654/rerun
```

---

## **🔹 8. Download Workflow Logs**
**Endpoint:**
```http
GET /repos/{owner}/{repo}/actions/runs/{run_id}/logs
```
**Example Request:**
```sh
curl -L -H "Authorization: token YOUR_GITHUB_TOKEN" \
     -H "Accept: application/vnd.github.v3+json" \
     -o workflow-logs.zip \
     https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/actions/runs/987654/logs
```
**Notes:**
- This downloads a ZIP file containing all logs for a workflow run.

# Use passing parameters on the GHA workflow APIs

---

## **🔹 How to Accept Parameters in a GitHub Actions Workflow**
You need to define **inputs** inside `on: workflow_dispatch`.

### **✅ Example: Workflow with Input Parameters**
```yaml
name: Triggered Workflow with Parameters

on:
  workflow_dispatch:
    inputs:
      recipient_email:
        description: "Email address to send the notification"
        required: true
        type: string
      subject:
        description: "Email subject"
        required: true
        type: string
      message:
        description: "Email body content"
        required: true
        type: string

jobs:
  send-email:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install Dependencies
        run: npm install

      - name: Send Email with Parameters
        env:
          EMAIL_USER: ${{ secrets.EMAIL_USER }}
          EMAIL_PASS: ${{ secrets.EMAIL_PASS }}
          RECIPIENT_EMAIL: ${{ inputs.recipient_email }}
          SUBJECT: ${{ inputs.subject }}
          MESSAGE: ${{ inputs.message }}
        run: |
          node src/send-email.js "$RECIPIENT_EMAIL" "$SUBJECT" "$MESSAGE"
```

---

## **🔹 How to Trigger the Workflow with Parameters**
### **1️⃣ From GitHub UI**
1. Go to your **GitHub repository**.
2. Click **Actions**.
3. Select your workflow from the left sidebar.
4. Click the **"Run workflow"** button.
5. Fill in the **parameters** (e.g., email, subject, message).
6. Click **"Run workflow"**.

---

### **2️⃣ Using GitHub API (cURL)**
You can trigger the workflow **via API** and pass parameters.

```sh
curl -X POST -H "Authorization: token YOUR_GITHUB_TOKEN" \
     -H "Accept: application/vnd.github.v3+json" \
     -H "Content-Type: application/json" \
     --data '{
       "ref": "main",
       "inputs": {
         "recipient_email": "user@example.com",
         "subject": "GitHub Actions Test",
         "message": "Hello from GitHub API!"
       }
     }' \
     https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/actions/workflows/email.yml/dispatches
```

---

## **🔹 How to Use Parameters in Your Code (Node.js)**
Your `send-email.js` should accept command-line arguments:
```javascript
const nodemailer = require("nodemailer");

// Get parameters from CLI arguments
const recipient = process.argv[2];
const subject = process.argv[3];
const message = process.argv[4];

async function sendEmailService() {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipient,
    subject: subject,
    text: message,
  };

  await transporter.sendMail(mailOptions);
  console.log("✅ Email sent successfully!");
}

sendEmailService().catch(console.error);
```
