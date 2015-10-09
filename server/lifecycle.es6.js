LifeCycle = {
  createAndWelcomeCustomer (name, email, slack) {
    const self = this;
    const splitNames = name.split(' ');
    const firstname = splitNames[0];
    const lastname = splitNames.slice(-1)[0];

    // Should come from a plan with discount code in effect
    const effectiveMinuteRate = 6.0;
    const minuteCredit = 30;

    const options = {
      email: email,
      password: Meteor.uuid(),
      profile: {
        firstname: firstname,
        lastname: lastname,
        slack: slack,
        hourlyRate: effectiveMinuteRate, // TODO hourlyRate is incorrectly labelled
        creditMs: minuteCredit
      }
    };
    try {
      const userId = D.Users.createCustomer(options);
      self.welcomeNewCustomer(firstname, email, slack);
      const text = `New customer sign up: *${name}*, email: ${email}, slack: ${slack || "N/A"}`;
      Slack.notify('signup', text);
    }
    catch (error) {
      const errorText = `${error}, ${JSON.stringify(options)}`;
      Slack.notify('signup', errorText);
    }
  },

  // TODO: we should refactor and pass in userId instead
  // of explicitly passing everything.
  welcomeNewCustomer (firstName, emailAddress, slackURL) {
    const email = EmailTemplates.welcome(firstName, emailAddress, slackURL);
    console.log(JSON.stringify(email));
    Email.send(email);
  }
};
