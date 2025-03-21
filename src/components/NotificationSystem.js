// Notification System Component
var NotificationSystem = {
  data: function() {
    return {
      notifications: [],
      nextId: 1
    };
  },
  methods: {
    addNotification: function(notification) {
      // Add a unique ID to the notification
      const id = this.nextId++;
      const notificationWithId = {
        ...notification,
        id: id,
        timeAdded: Date.now()
      };
      
      // Add to our list of active notifications
      this.notifications.push(notificationWithId);
      
      // Set up auto-removal after the duration
      setTimeout(() => {
        this.removeNotification(id);
      }, notification.duration || 5000);
      
      return id;
    },
    removeNotification: function(id) {
      const index = this.notifications.findIndex(n => n.id === id);
      if (index !== -1) {
        // Mark the notification for removal animation
        this.notifications[index].removing = true;
        
        // Actually remove after animation completes
        setTimeout(() => {
          this.notifications = this.notifications.filter(n => n.id !== id);
        }, 500); // Match your CSS transition time
      }
    },
    showAchievement: function(achievement) {
      return this.addNotification({
        type: 'achievement',
        title: 'Achievement Unlocked!',
        message: achievement.name,
        details: achievement.description,
        duration: 7000
      });
    },
    showTip: function(tip) {
      return this.addNotification({
        type: 'tip',
        title: 'Tip',
        message: tip,
        duration: 10000
      });
    },
    showAlert: function(message, title = 'Alert') {
      return this.addNotification({
        type: 'alert',
        title: title,
        message: message,
        duration: 5000
      });
    },
    showSuccess: function(message, title = 'Success') {
      return this.addNotification({
        type: 'success',
        title: title,
        message: message,
        duration: 3000
      });
    },
    showError: function(message, title = 'Error') {
      return this.addNotification({
        type: 'error',
        title: title,
        message: message,
        duration: 6000
      });
    },
    showNewsUpdate: function(headline, effect) {
      return this.addNotification({
        type: 'news',
        title: 'Breaking News',
        message: headline,
        details: effect,
        duration: 6000
      });
    },
    showMarketEvent: function(event, details) {
      return this.addNotification({
        type: 'market',
        title: 'Market Event',
        message: event,
        details: details,
        duration: 8000
      });
    },
    showTransactionComplete: function(type, stock, quantity, totalValue) {
      const isBuy = type === 'buy';
      return this.addNotification({
        type: isBuy ? 'buy' : 'sell',
        title: isBuy ? 'Purchase Complete' : 'Sale Complete',
        message: `${quantity} shares of ${stock.name} (${stock.symbol})`,
        details: `Total ${isBuy ? 'cost' : 'proceeds'}: $${totalValue.toLocaleString()}`,
        duration: 4000
      });
    }
  },
  template: 
    '<div class="notification-container">' +
      '<transition-group name="notification">' +
        '<div v-for="notification in notifications" :key="notification.id" ' +
            'class="notification" ' +
            ':class="[notification.type, { removing: notification.removing }]" ' +
            '@click="removeNotification(notification.id)">' +
          '<div class="notification-icon" v-if="notification.type === \'achievement\'">' +
            '<span class="icon-trophy">🏆</span>' +
          '</div>' +
          '<div class="notification-icon" v-else-if="notification.type === \'tip\'">' +
            '<span class="icon-tip">💡</span>' +
          '</div>' +
          '<div class="notification-icon" v-else-if="notification.type === \'alert\'">' +
            '<span class="icon-alert">ℹ️</span>' +
          '</div>' +
          '<div class="notification-icon" v-else-if="notification.type === \'success\'">' +
            '<span class="icon-success">✓</span>' +
          '</div>' +
          '<div class="notification-icon" v-else-if="notification.type === \'error\'">' +
            '<span class="icon-error">✗</span>' +
          '</div>' +
          '<div class="notification-icon" v-else-if="notification.type === \'news\'">' +
            '<span class="icon-news">📰</span>' +
          '</div>' +
          '<div class="notification-icon" v-else-if="notification.type === \'market\'">' +
            '<span class="icon-market">📊</span>' +
          '</div>' +
          '<div class="notification-icon" v-else-if="notification.type === \'buy\'">' +
            '<span class="icon-buy">🔼</span>' +
          '</div>' +
          '<div class="notification-icon" v-else-if="notification.type === \'sell\'">' +
            '<span class="icon-sell">🔽</span>' +
          '</div>' +
          
          '<div class="notification-content">' +
            '<div class="notification-title">{{ notification.title }}</div>' +
            '<div class="notification-message">{{ notification.message }}</div>' +
            '<div class="notification-details" v-if="notification.details">{{ notification.details }}</div>' +
          '</div>' +
          
          '<div class="notification-close">&times;</div>' +
          
          '<div class="notification-progress">' +
            '<div class="progress-bar" :style="{ animationDuration: ((notification.duration || 5000) / 1000) + \'s\' }"></div>' +
          '</div>' +
        '</div>' +
      '</transition-group>' +
    '</div>'
};
