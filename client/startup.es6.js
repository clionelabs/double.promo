Meteor.startup(
  function() {
    SEO.config({
      title: 'My Double gets things done for me. Get yours with this special deal.',
      meta: {
        'description': 'Double is your business assistant on Slack.'
      },
      twitter: {
        'card': 'summary_large_image',
        'site': '@askDouble'
      },
      og: {
        'type': 'website',
        'site_name': 'Double'
      }
    });
  }
);
