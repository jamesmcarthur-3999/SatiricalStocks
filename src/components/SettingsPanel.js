// Settings Panel component
const SettingsPanel = {
  props: {
    settings: Object,
    showPanel: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // Clone settings to avoid directly modifying props
      localSettings: { ...this.settings }
    };
  },
  watch: {
    settings: {
      handler(newSettings) {
        this.localSettings = { ...newSettings };
      },
      deep: true
    }
  },
  methods: {
    closePanel() {
      this.$emit('close');
    },
    saveSettings() {
      this.$emit('save', this.localSettings);
      this.closePanel();
    },
    resetDefaults() {
      // Default settings
      this.localSettings = {
        updateInterval: 5000,
        newsFrequency: 0.15,
        autosave: true,
        autosaveInterval: 60000,
        difficultyLevel: 'normal',
        showTutorial: true,
        dayLength: 5000
      };
    },
    getDifficultyDescription(level) {
      switch(level) {
        case 'easy':
          return 'Lower volatility, reduced taxes, higher starting cash';
        case 'normal':
          return 'Standard gameplay experience';
        case 'hard':
          return 'Higher volatility, increased taxes, lower starting cash';
        default:
          return '';
      }
    }
  },
  template: `
    <div class="settings-overlay" v-if="showPanel">
      <div class="settings-panel">
        <div class="panel-header">
          <h2>Settings</h2>
          <button class="close-btn" @click="closePanel">×</button>
        </div>
        
        <div class="settings-content">
          <div class="settings-section">
            <h3>Game Speed</h3>
            <div class="setting-item">
              <label>Market Update Interval (ms)</label>
              <input 
                type="range" 
                v-model.number="localSettings.updateInterval" 
                min="1000" 
                max="10000" 
                step="1000"
              />
              <span>{{ localSettings.updateInterval / 1000 }}s</span>
            </div>
            
            <div class="setting-item">
              <label>Day Length (ms)</label>
              <input 
                type="range" 
                v-model.number="localSettings.dayLength" 
                min="1000" 
                max="10000" 
                step="1000"
              />
              <span>{{ localSettings.dayLength / 1000 }}s</span>
            </div>
          </div>
          
          <div class="settings-section">
            <h3>Game Balance</h3>
            <div class="setting-item">
              <label>News Frequency</label>
              <input 
                type="range" 
                v-model.number="localSettings.newsFrequency" 
                min="0.05" 
                max="0.5" 
                step="0.05"
              />
              <span>{{ (localSettings.newsFrequency * 100).toFixed(0) }}%</span>
            </div>
            
            <div class="setting-item">
              <label>Difficulty Level</label>
              <select v-model="localSettings.difficultyLevel">
                <option value="easy">Easy</option>
                <option value="normal">Normal</option>
                <option value="hard">Hard</option>
              </select>
              <span class="setting-description">{{ getDifficultyDescription(localSettings.difficultyLevel) }}</span>
            </div>
          </div>
          
          <div class="settings-section">
            <h3>Misc</h3>
            <div class="setting-item checkbox">
              <label>
                <input type="checkbox" v-model="localSettings.autosave" />
                Enable Autosave
              </label>
            </div>
            
            <div class="setting-item" v-if="localSettings.autosave">
              <label>Autosave Interval (ms)</label>
              <input 
                type="range" 
                v-model.number="localSettings.autosaveInterval" 
                min="30000" 
                max="300000" 
                step="30000"
              />
              <span>{{ localSettings.autosaveInterval / 60000 }}m</span>
            </div>
            
            <div class="setting-item checkbox">
              <label>
                <input type="checkbox" v-model="localSettings.showTutorial" />
                Show Tutorial on Start
              </label>
            </div>
          </div>
        </div>
        
        <div class="settings-actions">
          <button class="btn btn-reset" @click="resetDefaults">Reset to Defaults</button>
          <button class="btn btn-save" @click="saveSettings">Save Settings</button>
        </div>
      </div>
    </div>
  `
};