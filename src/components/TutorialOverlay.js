// Tutorial Overlay component
const TutorialOverlay = {
  props: {
    steps: Array,
    currentStep: Object,
    show: Boolean
  },
  methods: {
    nextStep() {
      this.$emit('next-step');
    },
    skipTutorial() {
      this.$emit('skip-tutorial');
    },
    completeStep() {
      this.$emit('complete-step');
    }
  },
  computed: {
    currentStepIndex() {
      return this.steps.findIndex(step => step.id === this.currentStep.id);
    },
    isLastStep() {
      return this.currentStepIndex === this.steps.length - 1;
    },
    progressPercentage() {
      return ((this.currentStepIndex + 1) / this.steps.length * 100).toFixed(0);
    }
  },
  template: `
    <div class="tutorial-overlay" v-if="show">
      <div class="tutorial-modal">
        <div class="tutorial-header">
          <h3>{{ currentStep.title }}</h3>
          <button class="close-btn" @click="skipTutorial">×</button>
        </div>
        
        <div class="tutorial-content">
          <p>{{ currentStep.content }}</p>
        </div>
        
        <div class="tutorial-progress">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
          </div>
          <div class="progress-text">Step {{ currentStepIndex + 1 }} of {{ steps.length }}</div>
        </div>
        
        <div class="tutorial-actions">
          <button class="btn btn-skip" @click="skipTutorial">Skip Tutorial</button>
          <button class="btn btn-next" @click="nextStep" v-if="!isLastStep">Next</button>
          <button class="btn btn-finish" @click="completeStep" v-else>Finish</button>
        </div>
      </div>
    </div>
  `
};