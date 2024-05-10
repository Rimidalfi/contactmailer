# Contact NodeMailer

Contact NodeMailer is a simple Node.js application for forwarding inquiries via email using Nodemailer.

## Installation

1. Clone the repository:

```

git clone <repository_url>

```

2. Install dependencies:

```

npm install

```

3. Set up environment variables:

Create a `.env` file in the root directory and provide the following variables:

```

EMAIL_HOST=your_email_host
EMAIL_PORT=your_email_port
EMAIL_SEC=secure_connection_boolean
EMAIL=your_email_address
EMAIL_PW=your_email_password
FROM=sender_name
TO=recipient_email_address
SUBJECT=email_subject
PORT=server_port

```

4. Start the server:

```

npm start

```

## Usage

- **POST /**: This endpoint accepts JSON data containing email, name, phone number, and message fields. If the email and message fields are not empty, it forwards the inquiry to the specified email address.

- **GET /**: This endpoint returns a simple HTML page indicating that the Contact NodeMailer server is online.

## Dependencies

- [express](https://www.npmjs.com/package/express): Web framework for Node.js.
- [cors](https://www.npmjs.com/package/cors): Middleware for enabling CORS (Cross-Origin Resource Sharing) in Express.js.
- [nodemailer](https://www.npmjs.com/package/nodemailer): Module for sending emails from Node.js applications.
- [dotenv](https://www.npmjs.com/package/dotenv): Module for loading environment variables from a `.env` file into `process.env`.

## Configuration

- **EMAIL_HOST**: SMTP server hostname.
- **EMAIL_PORT**: SMTP server port.
- **EMAIL_SEC**: Boolean indicating whether to use a secure connection (true/false).
- **EMAIL**: Sender's email address.
- **EMAIL_PW**: Sender's email password.
- **FROM**: Sender's name.
- **TO**: Recipient's email address.
- **SUBJECT**: Email subject.
- **PORT**: Server port.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
