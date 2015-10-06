Slack = {
  hook(channel) {
    // TODO Look up hook based on channel
    return "https://hooks.slack.com/services/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";
  },
  notify(channel, text) {
    const self = this;
    const hook = self.hook(channel);
    const payload = {'payload': JSON.stringify({'text':text})};
    HTTP.post(hook, {'params': payload});
  }
};
