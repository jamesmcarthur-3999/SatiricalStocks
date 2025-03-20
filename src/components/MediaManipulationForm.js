// Media Manipulation Form component
const MediaManipulationForm = {
  props: {
    stocks: Array,
    isUnlocked: Boolean
  },
  data() {
    return {
      targetStock: null,
      effect: 0.1,
      customHeadline: '',
    };
  },
  computed: {
    effectPercentage() {
      return (this.effect * 100).toFixed(1);
    },
    effectDirection() {
      return this.effect >= 0 ? 'positive' : 'negative';
    },
    effectClass() {
      return this.effect >= 0 ? 'positive' : 'negative';
    }
  },
  methods: {
    setEffect(value) {
      this.effect = value;
    },
    submitForm() {
      if (!this.targetStock) {
        this.$emit('error', "Please select a target stock");
        return;
      }
      
      if (!this.customHeadline.trim()) {
        this.$emit('error', "Please enter a headline");
        return;
      }
      
      // Emit event with form data
      this.$emit('create-news', {
        stockId: this.targetStock,
        effect: this.effect,
        headline: this.customHeadline
      });
      
      // Reset form
      this.customHeadline = '';
    }
  },
  template: `
    <div class="media-manipulation-form" v-if="isUnlocked">
      <h3>Media Manipulation Console</h3>
      <p class="form-description">Create your own news to manipulate stock prices.</p>
      
      <div class="form-group">
        <label>Target Stock:</label>
        <select v-model="targetStock" class="form-control">
          <option :value="null">Select a stock</option>
          <option v-for="stock in stocks" :key="stock.id" :value="stock.id">
            {{ stock.name }} ({{ stock.symbol }})
          </option>
        </select>
      </div>
      
      <div class="form-group">
        <label>Effect Type:</label>
        <div class="effect-buttons">
          <button 
            @click="setEffect(-0.2)" 
            class="btn negative" 
            :class="{ active: effect === -0.2 }"
          >Very Negative (-20%)</button>
          
          <button 
            @click="setEffect(-0.1)" 
            class="btn negative" 
            :class="{ active: effect === -0.1 }"
          >Negative (-10%)</button>
          
          <button 
            @click="setEffect(0.1)" 
            class="btn positive" 
            :class="{ active: effect === 0.1 }"
          >Positive (+10%)</button>
          
          <button 
            @click="setEffect(0.2)" 
            class="btn positive" 
            :class="{ active: effect === 0.2 }"
          >Very Positive (+20%)</button>
        </div>
      </div>
      
      <div class="form-group">
        <label>Custom Headline:</label>
        <textarea 
          v-model="customHeadline" 
          class="form-control" 
          placeholder="Enter your manipulative headline here..."
          maxlength="100"
        ></textarea>
        <div class="character-count">{{ customHeadline.length }}/100</div>
      </div>
      
      <div class="form-preview" v-if="targetStock && customHeadline">
        <h4>Preview:</h4>
        <div class="news-item">
          <div class="news-headline">{{ customHeadline }}</div>
          <div class="news-effect" :class="effectClass">
            Effect: {{ stocks.find(s => s.id === targetStock)?.symbol }} {{ effect >= 0 ? '+' : '' }}{{ effectPercentage }}%
          </div>
        </div>
      </div>
      
      <button @click="submitForm" class="btn publish-btn" :disabled="!targetStock || !customHeadline.trim()">
        Publish Story
      </button>
    </div>
    <div class="media-manipulation-locked" v-else>
      <p>Purchase the Media Manipulation Machine upgrade to access this feature.</p>
    </div>
  `
};