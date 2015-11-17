EmailTemplates = {
  welcome (userId, firstName, emailAddress, slackURL, code, minuteRateDiscountPercent, effectiveMinuteRate, discountValidTill) {
    const telegramLink = `https://telegram.me/DoubleBot?start=${userId}`;

    let text = `${firstName},\n\nYour Double (me!) is ready to serve! You can reach me:\n\n1. Telegram me on ${telegramLink}\n2. Slack me. Invite double@double.co to your Slack.\n3. Email me at double@double.co\n\n`;
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
