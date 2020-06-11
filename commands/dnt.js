exports.run = async (client, message, args) => {
    message.delete();
    var author = message.author.tag
    const conf = require('../config/config.json');
    const webhookdnt = new Discord.WebhookClient(conf.darknet_webhook_id, conf.darknet_webhook_token);
    const webhookdntlog = new Discord.WebhookClient(conf.darknet_log_webhook_id, conf.darknet_log_webhook_token);
    webhookdnt.send(`${args}`);
    webhookdntlog.send(`||                                             || \n${author} \n||                                             || \n${args} \n||                                             ||`);
};