type Headers = {
    recieved: string;
    date: string;
    from: string;
    to: string;
    message_id: string;
    subject: string;
    mime_version: string;
    content_type: string;
    dkim_signature: string;
    x_google_dkim_signature?: string;
    x_gm_message_state?: string;
    x_google_smtp_source?: string;
    x_recieved: string;
};
type Envelope = {
    to: string;
    recipents: string[];
    from: string;
    helo_domain:string;
    remote_ip: string;
    tls: boolean;
    tls_cipher: string;
    spf: object;
}
type Attachment = {
    content: string;
    filename: string;
    content_type: string;
    size: string;
    disposition: string;
    content_id: string;
}
export type RequestBody = {
    headers: Headers
    envelope: Envelope;
    plain?: string;
    html?: string;
    reply_plain?: string;
    attachments?:  Attachment[];
};

export interface Environment {
    TELEGRAM_TOKEN: string;
    TELEGRAM_USER_ID: string;
    PATH: string;
    AUTH: string;
}