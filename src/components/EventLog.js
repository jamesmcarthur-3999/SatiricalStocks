// Event Log component
const EventLog = {
  props: {
    events: Array,
    showPanel: {
      type: Boolean,
      default: false
    },
    filters: {
      type: Array,
      default: () => ['all', 'trade', 'news', 'market', 'tax', 'upgrade', 'achievement']
    }
  },
  data() {
    return {
      activeFilter: 'all'
    };
  },
  computed: {
    filteredEvents() {
      if (this.activeFilter === 'all') {
        return this.events;
      }
      return this.events.filter(event => event.type === this.activeFilter);
    }
  },
  methods: {
    setFilter(filter) {
      this.activeFilter = filter;
    },
    closePanel() {
      this.$emit('close');
    },
    clearLog() {
      this.$emit('clear');
    },
    getEventClass(type) {
      const classes = {
        trade: 'event-trade',
        news: 'event-news',
        market: 'event-market',
        tax: 'event-tax',
        upgrade: 'event-upgrade',
        achievement: 'event-achievement',
        info: 'event-info',
        error: 'event-error'
      };
      return classes[type] || 'event-info';
    },
    getEventIcon(type) {
      const icons = {
        trade: '💰',
        news: '📰',
        market: '📈',
        tax: '📋',
        upgrade: '⚡',
        achievement: '🏆',
        info: 'ℹ️',
        error: '⚠️'
      };
      return icons[type] || 'ℹ️';
    },
    formatEventTime(event) {
      return `Day ${event.gameDay}`;
    }
  },
  template: `
    <div class="event-log-overlay" v-if="showPanel">
      <div class="event-log-panel">
        <div class="panel-header">
          <h2>Event Log</h2>
          <button class="close-btn" @click="closePanel">×</button>
        </div>
        
        <div class="log-filters">
          <button 
            v-for="filter in filters" 
            :key="filter"
            class="filter-btn"
            :class="{ active: activeFilter === filter }"
            @click="setFilter(filter)"
          >
            {{ filter.charAt(0).toUpperCase() + filter.slice(1) }}
          </button>
          <button class="clear-btn" @click="clearLog">Clear Log</button>
        </div>
        
        <div class="events-list">
          <div 
            v-for="(event, index) in filteredEvents" 
            :key="index" 
            class="event-item"
            :class="getEventClass(event.type)"
          >
            <div class="event-icon">{{ getEventIcon(event.type) }}</div>
            <div class="event-details">
              <div class="event-message">{{ event.message }}</div>
              <div class="event-time">{{ formatEventTime(event) }}</div>
            </div>
          </div>
          
          <div class="no-events" v-if="filteredEvents.length === 0">
            No events to display.
          </div>
        </div>
      </div>
    </div>
  `
};