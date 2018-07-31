import config from './config'
import * as AWS from 'aws-sdk'

AWS.config.update({region: config.region});

export function isValidEmail(valueToCheck: string) {
    const tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if (!valueToCheck || valueToCheck.length>254 || !tester.test(valueToCheck))
		return false
	return true
}

export function sendAWSSES(content: string, from: string) {
    var params = {
        Destination: {
            ToAddresses: [
                config.emailDestination,
            ]
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: content + " send from " + from
                },
                Text: {
                    Charset: "UTF-8",
                    Data: content + " send from " + from
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Contact form on resume site'
            }
        },
        Source: config.emailDestination,
        ReplyToAddresses: [
            from,
        ],
    };

    return new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();  
}