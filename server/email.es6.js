EmailTemplates = {
  welcome (firstName, emailAddress, slackURL, code, minuteRateDiscountPercent, effectiveMinuteRate, discountValidTill) {
    let text = `${firstName},\n\nYour Double (me!) is ready to serve! Simply reply to this email with your first request.\n\n`;
    if (!slackURL) {
      text = `${text}We work best over Slack (https://slack.com). Most of our customers invite me (double@double.co) to their Slack. Or, we can create a new Slack between us. Slack is free and a great way to work with your team.\n\n`;
    } else {
      text = `${text}We work best over Slack. Invite me (double@double.co) to your Slack thru ${slackURL+'/admin/invites/full'} (Slack requires admin right to invite members and our software requires us to have "full member" rights).\n\n`;
    }
    if (!code) {
      text = `${text}As a new customer, we have waived your first month membership fee and credited a 30-minute usage to your account. Remember chatting is always free with us and you only pay for the minutes we execute on our pre-agreed action plan.\n\n`;
      text = `${text}Throw us anything. Some of the common requests include market research, intern hiring and even selling used items. Email me your overdue tasks and I could help you cross those off your list.\n\n`;
    } else {
      text = `${text}As a new customer, we have waived your first month membership fee and credited a 30-minute usage to your account. You also receive ${minuteRateDiscountPercent}% off your minute rate via discount code ${code}. Your effective rate is HK$${effectiveMinuteRate} / minute till ${discountValidTill}.\n\n`;
      text = `${text}Remember chatting is always free with us and you only pay for the minutes we execute on our pre-agreed action plan. Some of the common requests include market research, intern hiring and even selling used items.\n\nEmail me your overdue tasks and I could help you cross those off your list.\n\n`;
    }
    text = `${text}Your Double`
    return {
      from: 'Double <double@double.co>',
      to: emailAddress,
      bcc: ['thomas@double.co', 'cary@double.co'],
      subject: 'Your Double is ready to serve',
      text: text
    };
  }
};
