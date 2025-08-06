
## 🚀 Features

* User Authentication with JWT
* Email Verification (using Nodemailer)
* Forgot Password with OTP Verification
* AWS S3 Integration for File Storage
* Folder Management
* File Previews (images, PDF, docs, etc.)
* Multiple File Uploads
* File Deletion
* CORS-configured for seamless frontend integration

---

## 🛠️ Technologies Used

* **Node.js**
* **Express.js**
* **MongoDB** + Mongoose
* **AWS S3**
* **JWT (JSON Web Tokens)**
* **Nodemailer**
* **dotenv**
* **multer / multer-s3** for file handling

---

## 📂 Project Structure

```
filestorage-backend/
├── controller/
├── models/
├── routes/
├── config/
├── middleware/
├── services/
├── .env
├── app.js
└── package.json
```

---

## ⚙️ Environment Variables (`.env`)

Create a `.env` file in the root and configure the following variables:

```env
# MongoDB Connection
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/yourDB

# Email Configuration for Verification
EMAIL=your_email@example.com
PASSWORD=your_email_password

# JWT Secret
JWT_SECRET_KEY=your_jwt_secret_key

# Frontend URL
FRONTEND_URL=http://localhost:3000

# AWS S3 Configuration
S3_ACCESS_KEY_ID=your_aws_access_key
S3_SECRET_ACCESS_KEY=your_aws_secret_key
S3_BUCKET_NAME=your_bucket_name
AWS_REGION=your_aws_region
```

---

##  API Endpoints

### ✅ Auth

| Method   | Endpoint                   | Description      |
| ------   | ---------------------------|------------------|
| POST     | `/customer`                | Register user    |
| POST     | `/customer/login`          | Log in user      |
| POST     | `/customer/forgot-password`|Uploadfiles       |
| POST     | `/customer/verify-otp`     | VerifyOTP        |

---

### 📂 File Storage

| Method | Endpoint              | Description           |
| ------ | --------------------- | --------------------- |
| POST   | `/filestorage`        | Upload files          |
| GET    | `/filestorage`        | Get all files by user |
| GET    | `/filestorage/:id`    | Get file by ID        |
| DELETE | `/filestorage/:id`    | Delete file           |

---

## Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/NarjishaK/filestoragesystem-backend.git
cd filestoragesystem-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure `.env`

Update your `.env` file with MongoDB, Email, AWS S3, and JWT credentials.

### 4. Start the Server

```bash
npm start
```

---

## Security Notes

* Passwords are hashed using **bcrypt**
* Tokens are stored securely with expiration
* Email verification ensures real users
* AWS S3 access keys are kept in `.env` and not exposed

---
