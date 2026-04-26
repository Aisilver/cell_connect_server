export function EmailEventsMessages (email: string, event?: string) {
    return {
        DELAYED: "we’re experiencing a delay delivering your email. It should arrive shortly. If you don’t receive it, please check your spam folder or try again later.",

        BOUNCED: `we couldn’t deliver the email to "${email}" . Please check that your email is correct and try again.`,

        SUPPRESSED: `we’re unable to send emails to "${email}" at the moment, please try another email or contact support if you believe this is an error.`,

        FAILED: `an error has occured while sending to "${email}", please try another email or contact support.`,
    
        COMPLAINED: `email delivery to "${email}" has been paused due to a spam report. Contact support if this was accidental.`,

        NO_EVENT_AFTER_SENT_EVENT_TIMEOUT: `mail has been sent but current state of mail is unknown, wait few minutes and try again if mail is not recieved`,

        UNKNOWN_EVENT: `an unhandled event (${event ?? 'unknown event'}) occured while sending mail to "${email}", if mail has not been delivered try again later`
    }
};
