// Tooltip Component
var Tooltip = {
  props: {
    text: {
      type: String,
      required: true
    },
    position: {
      type: String,
      default: 'top',
      validator: function(value) {
        return ['top', 'bottom', 'left', 'right'].indexOf(value) !== -1;
      }
    },
    width: {
      type: String,
      default: '200px'
    },
    showIcon: {
      type: Boolean,
      default: true
    }
  },
  data: function() {
    return {
      isVisible: false
    };
  },
  methods: {
    showTooltip: function() {
      this.isVisible = true;
    },
    hideTooltip: function() {
      this.isVisible = false;
    },
    toggleTooltip: function() {
      this.isVisible = !this.isVisible;
    }
  },
  template: 
    '<div class="tooltip-container">' +
      '<div class="tooltip-trigger" @mouseenter="showTooltip" @mouseleave="hideTooltip" @click="toggleTooltip">' +
        '<slot name="trigger">' +
          '<span v-if="showIcon" class="tooltip-icon">?</span>' +
        '</slot>' +
      '</div>' +
      '<transition name="tooltip-fade">' +
        '<div v-show="isVisible" class="tooltip-content" :class="position" :style="{ maxWidth: width }">' +
          '<div class="tooltip-arrow"></div>' +
          '<div class="tooltip-inner">' +
            '<slot>' +
              '{{ text }}' +
            '</slot>' +
          '</div>' +
        '</div>' +
      '</transition>' +
    '</div>'
};
