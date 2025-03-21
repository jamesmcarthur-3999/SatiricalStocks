// Game Controls Component
var GameControls = {
  props: {
    isPaused: {
      type: Boolean,
      default: false
    },
    speed: {
      type: Number,
      default: 1
    },
    marketOpen: {
      type: Boolean,
      default: true
    },
    gameTime: {
      type: Object,
      default: function() {
        return {
          day: 1,
          hour: 9,
          minute: 30
        };
      }
    }
  },
  data: function() {
    return {
      speedOptions: [
        { value: 0.5, label: '0.5x' },
        { value: 1, label: '1x' },
        { value: 2, label: '2x' },
        { value: 5, label: '5x' }
      ]
    };
  },
  computed: {
    formattedTime: function() {
      const { day, hour, minute } = this.gameTime;
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const hour12 = hour % 12 || 12;
      const minuteStr = minute < 10 ? `0${minute}` : minute;
      return `Day ${day} - ${hour12}:${minuteStr} ${ampm}`;
    },
    marketStatus: function() {
      return this.marketOpen ? 'Market Open' : 'Market Closed';
    }
  },
  methods: {
    togglePause: function() {
      this.$emit('toggle-pause');
    },
    setSpeed: function(speed) {
      this.$emit('set-speed', speed);
    },
    toggleMarket: function() {
      this.$emit('toggle-market');
    },
    openSettings: function() {
      this.$emit('open-settings');
    },
    saveGame: function() {
      this.$emit('save-game');
    },
    loadGame: function() {
      this.$emit('load-game');
    }
  },
  template: 
    '<div class="game-controls-panel">' +
      '<div class="game-time">' +
        '<div class="time-display">' +
          '<div class="time-icon">⏰</div>' +
          '<div class="time-text">{{ formattedTime }}</div>' +
        '</div>' +
        '<div class="market-status" :class="{ \'market-closed\': !marketOpen }">' +
          '<div class="status-indicator"></div>' +
          '<div class="status-text">{{ marketStatus }}</div>' +
        '</div>' +
      '</div>' +
      
      '<div class="control-buttons">' +
        '<button @click="togglePause" class="btn" :class="{ \'active\': isPaused }">' +
          '{{ isPaused ? "Resume" : "Pause" }}' +
        '</button>' +
        
        '<div class="speed-controls">' +
          '<span class="speed-label">Speed:</span>' +
          '<div class="speed-buttons">' +
            '<button v-for="option in speedOptions" :key="option.value" ' +
              'class="btn speed-btn" ' +
              ':class="{ \'active\': speed === option.value }" ' +
              '@click="setSpeed(option.value)">' +
              '{{ option.label }}' +
            '</button>' +
          '</div>' +
        '</div>' +
        
        '<button @click="toggleMarket" class="btn" :class="{ \'market-btn-closed\': !marketOpen }">' +
          '{{ marketOpen ? "Close Market" : "Open Market" }}' +
        '</button>' +
      '</div>' +
      
      '<div class="game-management">' +
        '<button @click="saveGame" class="btn">Save</button>' +
        '<button @click="loadGame" class="btn">Load</button>' +
        '<button @click="openSettings" class="btn">Settings</button>' +
      '</div>' +
    '</div>'
};
