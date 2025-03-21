// Intro Screen Component
var IntroScreen = {
  props: ['player'],
  data: function() {
    return {
      playerName: '',
      step: 1,
      maxSteps: 3,
      difficultyOptions: [
        { id: 'easy', name: 'Easy', description: 'Start with $20,000 and low fees', startCash: 20000 },
        { id: 'normal', name: 'Normal', description: 'Start with $10,000 and standard fees', startCash: 10000 },
        { id: 'hard', name: 'Hard', description: 'Start with $5,000 and high fees', startCash: 5000 }
      ],
      selectedDifficulty: 'normal',
      showTips: true
    };
  },
  computed: {
    selectedDifficultyObj: function() {
      return this.difficultyOptions.find(opt => opt.id === this.selectedDifficulty);
    }
  },
  methods: {
    nextStep: function() {
      if (this.step < this.maxSteps) {
        this.step++;
      } else {
        this.startGame();
      }
    },
    prevStep: function() {
      if (this.step > 1) {
        this.step--;
      }
    },
    selectDifficulty: function(difficultyId) {
      this.selectedDifficulty = difficultyId;
    },
    startGame: function() {
      // Pass player name and starting cash to parent
      this.$emit('start-game', {
        playerName: this.playerName || 'Aspiring Tycoon',
        startCash: this.selectedDifficultyObj.startCash,
        showTips: this.showTips
      });
    }
  },
  template: 
    '<div class="intro-screen">' +
      '<div class="intro-content">' +
        '<h1 class="intro-title">Satirical Stocks</h1>' +
        '<h2 class="intro-subtitle">The Wealth Hoarding Simulator</h2>' +
        
        '<div class="intro-step" v-if="step === 1">' +
          '<h3>Welcome to the Market</h3>' +
          '<p>In this satirical stock market game, you\'ll experience the thrilling highs and financially devastating lows of market trading. Buy low, sell high, and use every trick in the book to climb the wealth ladder.</p>' +
          '<div class="name-input">' +
            '<label for="player-name">Your Name:</label>' +
            '<input type="text" id="player-name" v-model="playerName" placeholder="Aspiring Tycoon" maxlength="20">' +
          '</div>' +
          '<div class="intro-features">' +
            '<div class="feature-item">' +
              '<div class="feature-icon">📈</div>' +
              '<div class="feature-text">Trade in a dynamic market with realistic trends</div>' +
            '</div>' +
            '<div class="feature-item">' +
              '<div class="feature-icon">📊</div>' +
              '<div class="feature-text">Master sector correlations and volatility</div>' +
            '</div>' +
            '<div class="feature-item">' +
              '<div class="feature-icon">💰</div>' +
              '<div class="feature-text">Unlock upgrades to "optimize" your wealth</div>' +
            '</div>' +
            '<div class="feature-item">' +
              '<div class="feature-icon">🏆</div>' +
              '<div class="feature-text">Earn achievements as your wealth grows</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        
        '<div class="intro-step" v-if="step === 2">' +
          '<h3>Choose Your Difficulty</h3>' +
          '<p>Select how you want to start your wealth accumulation journey:</p>' +
          '<div class="difficulty-options">' +
            '<div v-for="option in difficultyOptions" :key="option.id" ' +
                'class="difficulty-option" ' +
                ':class="{ \'selected\': selectedDifficulty === option.id }" ' +
                '@click="selectDifficulty(option.id)">' +
              '<h4>{{ option.name }}</h4>' +
              '<p>{{ option.description }}</p>' +
              '<div class="difficulty-cash">${{ option.startCash.toLocaleString() }}</div>' +
            '</div>' +
          '</div>' +
          '<div class="game-options">' +
            '<div class="option-item">' +
              '<input type="checkbox" id="show-tips" v-model="showTips">' +
              '<label for="show-tips">Show gameplay tips</label>' +
            '</div>' +
          '</div>' +
        '</div>' +
        
        '<div class="intro-step" v-if="step === 3">' +
          '<h3>Ready to Start Trading?</h3>' +
          '<div class="final-summary">' +
            '<p><strong>Player Name:</strong> {{ playerName || "Aspiring Tycoon" }}</p>' +
            '<p><strong>Starting Cash:</strong> ${{ selectedDifficultyObj.startCash.toLocaleString() }}</p>' +
            '<p><strong>Difficulty:</strong> {{ selectedDifficultyObj.name }}</p>' +
          '</div>' +
          '<p class="final-message">Remember, it\'s just a game... unlike real wealth inequality!</p>' +
        '</div>' +
        
        '<div class="intro-navigation">' +
          '<button v-if="step > 1" @click="prevStep" class="btn btn-secondary">Previous</button>' +
          '<button v-if="step < maxSteps" @click="nextStep" class="btn btn-primary">Next</button>' +
          '<button v-if="step === maxSteps" @click="startGame" class="btn btn-start">Start Trading</button>' +
        '</div>' +
      '</div>' +
    '</div>'
};
