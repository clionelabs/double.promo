EmailTemplates = {
  welcome (firstName, emailAddress, slackURL) {
    let text = `${firstName},\n\nYour Double (me!) is ready to serve!\n\nSimply reply to this email with your first request.\n\n`;
    text = `${text}Your Double`
    return {
      from: 'double@double.co',
      to: emailAddress,
      subject: 'Your Double is ready to serve',
      text: text
    };
  }
};
