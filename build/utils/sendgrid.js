"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const sgMail = require('@sendgrid/mail');
const config_1 = __importDefault(require("../config"));
sgMail.setApiKey(config_1.default.SENDGRID_API_KEY);
console.log();
const messages = {};
const templateIds = {
    verify: {
        en: 'd-0a5137f3b9c64748a32b3b4e2c93c2af',
        ar: 'd-0a5137f3b9c64748a32b3b4e2c93c2af'
    }
};
//ES8
const sendMessage = (to, url, name) => __awaiter(void 0, void 0, void 0, function* () {
    const msg = {
        to,
        from: 'immortal.mind2016@gmail.com',
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
});
exports.sendMessage = sendMessage;
//# sourceMappingURL=sendgrid.js.map