Meteor.startup(
  function() {
    SEO.config({
      title: 'My Double gets things done for me. Get yours with this special deal.',
      meta: {
        'description': 'Double is on-demand business assistant on Slack. Free membership + 10% off our minute rate if you join now.'
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
