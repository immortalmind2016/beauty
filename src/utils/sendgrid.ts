const sgMail = require('@sendgrid/mail');
import config from '../config';
sgMail.setApiKey(config.SENDGRID_API_KEY);
console.log();
const messages = {};
const templateIds = {
    verify: {
        en: 'd-0a5137f3b9c64748a32b3b4e2c93c2af',
        ar: 'd-0a5137f3b9c64748a32b3b4e2c93c2af'
    }
};
//ES8
export const sendMessage: (to: String, url: string, name: string) => Promise<void> = async (
    to: string,
    url: string,
    name: string
): Promise<void> => {
    const msg = {
        to,
        from: 'immortal.mind2016@gmail.com', // Use the email address or domain you verified above
        template_id: templateIds.verify.en,
        dynamic_template_data: {
            verficiation_url: url,
            name
        }
    };
    /*/ const msg = {
        to,
        from: 'immortal.mind2016@gmail.com', // Use the email address or domain you verified above
        subject: 'Sending with Twilio SendGrid is Fun',
        text: 'click here',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>'
    };*/
    return sgMail.send(msg);
};
