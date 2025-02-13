import os
import sendgrid
from dotenv import load_dotenv
from app.settings.config import settings
from app.core.logger.logger import logger
from sendgrid.helpers.mail import Mail, Email, To, Content
import ssl
import certifi
# Load environment variables
load_dotenv()

SENDGRID_API_KEY = settings.SENDGRID_API_KEY
FROM_EMAIL = settings.SENDGRID_FROM_EMAIL

def send_email(mail_config: dict):
    logger.info("Enter into send_email method in email")
    if(mail_config.get("to") is None):
        logger.error("No email address provided")
        raise ValueError("No email address provided")
    

    try:
        ssl_context = ssl.create_default_context(cafile=certifi.where())
        sg = sendgrid.SendGridAPIClient(SENDGRID_API_KEY)
        from_email = Email(FROM_EMAIL)  # Change to your verified sender
        to_email = To(mail_config.get('to'))  # Change to your recipient
        subject = mail_config.get('subject')

        if(mail_config.get("html_content") is not None):
            content = Content( "text/html",mail_config.get("html_content"))
        else:
            content = Content("text/plain", mail_config.get("content"))
        mail = Mail(from_email, to_email, subject, content)

        # Get a JSON-ready representation of the Mail object
        mail_json = mail.get()

        # Send an HTTP POST request to /mail/send
        response = sg.client.mail.send.post(request_body=mail_json)
        print(response.status_code)
        print(response.headers)
    except Exception as e:
        print(f"Error sending email: {e}")


