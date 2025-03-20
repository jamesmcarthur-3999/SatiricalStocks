// Achievements Panel component
const AchievementsPanel = {
  props: {
    achievements: Array,
    showPanel: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    completedCount() {
      return this.achievements.filter(a => a.completed).length;
    },
    totalCount() {
      return this.achievements.length;
    },
    completionPercentage() {
      return ((this.completedCount / this.totalCount) * 100).toFixed(0);
    }
  },
  methods: {
    closePanel() {
      this.$emit('close');
    }
  },
  template: `
    <div class="achievements-overlay" v-if="showPanel">
      <div class="achievements-panel">
        <div class="panel-header">
          <h2>Achievements</h2>
          <button class="close-btn" @click="closePanel">×</button>
        </div>
        
        <div class="completion-summary">
          <div class="completion-text">
            <span class="completion-percentage">{{ completionPercentage }}%</span> 
            Completed ({{ completedCount }}/{{ totalCount }})
          </div>
          <div class="completion-bar">
            <div class="completion-progress" :style="{ width: completionPercentage + '%' }"></div>
          </div>
        </div>
        
        <div class="achievements-list">
          <div 
            v-for="achievement in achievements" 
            :key="achievement.id" 
            class="achievement-item"
            :class="{ completed: achievement.completed }"
          >
            <div class="achievement-icon">
              <div v-if="achievement.completed" class="completed-icon">✓</div>
              <div v-else class="locked-icon">🔒</div>
            </div>
            <div class="achievement-details">
              <div class="achievement-name">{{ achievement.name }}</div>
              <div class="achievement-description">{{ achievement.description }}</div>
              <div class="achievement-reward" v-if="achievement.reward">
                Reward: ${{ achievement.reward.toLocaleString() }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};