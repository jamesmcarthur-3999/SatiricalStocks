// Tutorial System Component
var TutorialSystem = {
  data: function() {
    return {
      active: false,
      currentStep: 0,
      stepsCompleted: {},
      tutorialSteps: [
        {
          id: 'welcome',
          title: 'Welcome to Satirical Stocks!',
          content: "Welcome to the market, rookie investor! This tutorial will guide you through the basic mechanics of becoming a wealth-hoarding market manipulator... I mean, a 'successful investor'.",
          position: 'center',
          target: 'body',
          nextButtonText: 'Start Tutorial'
        },
        {
          id: 'market-overview',
          title: 'Market Overview',
          content: "This chart shows the performance of all available stocks. The market follows cycles of bull (up) and bear (down) trends. Different sectors respond differently to these trends.",
          position: 'bottom',
          target: '.stock-chart',
          nextButtonText: 'Next'
        },
        {
          id: 'market-trends',
          title: 'Market Trends',
          content: "Here you can monitor the overall market direction and individual sector trends. Stocks tend to follow their sector's trend, which follows the overall market trend... except when they don't!",
          position: 'top',
          target: '.market-trends',
          nextButtonText: 'Next'
        },
        {
          id: 'buying-stocks',
          title: 'Buying Stocks',
          content: "Click the Buy button to purchase stocks. You can select a quantity using the quantity selector. Remember: buy low, sell high... unless you enjoy losing money!",
          position: 'left',
          target: '.stock-list .stock-item:first-child .stock-actions',
          nextButtonText: 'Next'
        },
        {
          id: 'news-events',
          title: 'News and Events',
          content: "Keep an eye on breaking news! News events can dramatically affect stock prices. Some are company-specific, others affect entire sectors or the whole market.",
          position: 'top',
          target: '.news-section',
          nextButtonText: 'Next'
        },
        {
          id: 'upgrades',
          title: 'Optimize Your Wealth',
          content: "Purchase upgrades to gain advantages in the market. From reducing fees to getting insider tips, these opportunities are totally ethical and not at all a satirical commentary on real-world practices!",
          position: 'right',
          target: '.upgrade-shop',
          nextButtonText: 'Next'
        },
        {
          id: 'achievements',
          title: 'Achievements',
          content: "Complete various challenges to unlock achievements. These serve as milestones in your journey from humble investor to wealth-hoarding market manipulator.",
          position: 'right',
          target: '.achievements',
          nextButtonText: 'Next'
        },
        {
          id: 'game-controls',
          title: 'Game Controls',
          content: "Control game speed, pause, and check the market hours here. The market opens at 9 AM and closes at 4 PM game time. No trading when the market is closed!",
          position: 'bottom',
          target: '.game-controls-panel',
          nextButtonText: 'Next'
        },
        {
          id: 'wealth-meter',
          title: 'Wealth Hoarder Status',
          content: "Track your wealth accumulation here. As your net worth grows, you'll climb the social ladder of increasing absurdity. How rich can you get?",
          position: 'left',
          target: '.wealth-meter',
          nextButtonText: 'Next'
        },
        {
          id: 'tooltip-help',
          title: 'Help & Information',
          content: "Look for these info icons throughout the game for helpful tooltips about game mechanics. Tooltips are your friend!",
          position: 'top',
          target: '.tooltip-icon:first-of-type',
          nextButtonText: 'Next'
        },
        {
          id: 'final',
          title: 'Ready to Trade!',
          content: "You're now ready to start your journey to incredible wealth! Remember, it's just a game... unlike real wealth inequality! Good luck, and may the market be ever in your favor.",
          position: 'center',
          target: 'body',
          nextButtonText: 'Start Trading'
        }
      ]
    };
  },
  computed: {
    currentStepData() {
      return this.tutorialSteps[this.currentStep] || this.tutorialSteps[0];
    },
    isFirstStep() {
      return this.currentStep === 0;
    },
    isLastStep() {
      return this.currentStep === this.tutorialSteps.length - 1;
    },
    tooltipStyle() {
      if (!this.active) return {};
      
      const target = document.querySelector(this.currentStepData.target);
      if (!target || this.currentStepData.position === 'center') {
        return {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        };
      }
      
      const targetRect = target.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      
      // Position calculation based on position prop
      switch (this.currentStepData.position) {
        case 'top':
          return {
            bottom: (window.innerHeight - targetRect.top + scrollTop + 10) + 'px',
            left: (targetRect.left + scrollLeft + targetRect.width / 2) + 'px',
            transform: 'translateX(-50%)'
          };
        case 'bottom':
          return {
            top: (targetRect.bottom + scrollTop + 10) + 'px',
            left: (targetRect.left + scrollLeft + targetRect.width / 2) + 'px',
            transform: 'translateX(-50%)'
          };
        case 'left':
          return {
            top: (targetRect.top + scrollTop + targetRect.height / 2) + 'px',
            right: (window.innerWidth - targetRect.left + scrollLeft + 10) + 'px',
            transform: 'translateY(-50%)'
          };
        case 'right':
          return {
            top: (targetRect.top + scrollTop + targetRect.height / 2) + 'px',
            left: (targetRect.right + scrollLeft + 10) + 'px',
            transform: 'translateY(-50%)'
          };
        default:
          return {
            top: (targetRect.bottom + scrollTop + 10) + 'px',
            left: (targetRect.left + scrollLeft + targetRect.width / 2) + 'px',
            transform: 'translateX(-50%)'
          };
      }
    },
    arrowStyle() {
      const position = this.currentStepData.position;
      if (position === 'center') return { display: 'none' };
      
      // Adjust arrow position based on tooltip position
      switch (position) {
        case 'top':
          return { bottom: '100%', left: '50%', transform: 'translateX(-50%) rotate(180deg)' };
        case 'bottom':
          return { top: '100%', left: '50%', transform: 'translateX(-50%) rotate(0deg)' };
        case 'left':
          return { top: '50%', right: '100%', transform: 'translateY(-50%) rotate(90deg)' };
        case 'right':
          return { top: '50%', left: '100%', transform: 'translateY(-50%) rotate(270deg)' };
        default:
          return { display: 'none' };
      }
    }
  },
  methods: {
    startTutorial() {
      this.active = true;
      this.currentStep = 0;
      this.stepsCompleted = {};
      this.highlightElement();
      
      // Trigger tutorial started event
      this.$emit('tutorial-started');
    },
    endTutorial() {
      this.active = false;
      this.removeHighlight();
      
      // Trigger tutorial ended event
      this.$emit('tutorial-ended');
    },
    nextStep() {
      // Mark current step as completed
      this.stepsCompleted[this.currentStepData.id] = true;
      
      // Remove highlight from current element
      this.removeHighlight();
      
      if (this.isLastStep) {
        this.endTutorial();
        return;
      }
      
      // Move to next step
      this.currentStep++;
      
      // Apply highlight to new element
      this.$nextTick(() => {
        this.highlightElement();
      });
    },
    prevStep() {
      if (this.isFirstStep) return;
      
      // Remove highlight from current element
      this.removeHighlight();
      
      // Move to previous step
      this.currentStep--;
      
      // Apply highlight to new element
      this.$nextTick(() => {
        this.highlightElement();
      });
    },
    skipTutorial() {
      this.endTutorial();
    },
    highlightElement() {
      if (!this.active) return;
      
      const target = document.querySelector(this.currentStepData.target);
      
      // If it's a center position or no valid target, don't highlight
      if (!target || this.currentStepData.position === 'center') return;
      
      // Add highlight class
      target.classList.add('tutorial-highlight');
      
      // Scroll element into view if needed
      const targetRect = target.getBoundingClientRect();
      const isInViewport = (
        targetRect.top >= 0 &&
        targetRect.left >= 0 &&
        targetRect.bottom <= window.innerHeight &&
        targetRect.right <= window.innerWidth
      );
      
      if (!isInViewport) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    },
    removeHighlight() {
      // Remove highlight class from all elements
      const highlighted = document.querySelectorAll('.tutorial-highlight');
      highlighted.forEach(el => el.classList.remove('tutorial-highlight'));
    }
  },
  beforeDestroy() {
    // Clean up any highlights when component is destroyed
    this.removeHighlight();
  },
  template: 
    '<div class="tutorial-system">' +
      '<transition name="fade">' +
        '<div v-if="active" class="tutorial-overlay">' +
          '<div class="tutorial-tooltip" :style="tooltipStyle">' +
            '<div class="tutorial-arrow" :style="arrowStyle"></div>' +
            '<div class="tutorial-header">' +
              '<h3 class="tutorial-title">{{ currentStepData.title }}</h3>' +
              '<div class="tutorial-step-counter">Step {{ currentStep + 1 }} of {{ tutorialSteps.length }}</div>' +
            '</div>' +
            '<div class="tutorial-content">' +
              '<p>{{ currentStepData.content }}</p>' +
            '</div>' +
            '<div class="tutorial-controls">' +
              '<button ' +
                'v-if="!isFirstStep" ' +
                'class="tutorial-btn tutorial-prev" ' +
                '@click="prevStep">' +
                'Previous' +
              '</button>' +
              '<button ' +
                'class="tutorial-btn tutorial-next" ' +
                '@click="nextStep">' +
                '{{ currentStepData.nextButtonText || "Next" }}' +
              '</button>' +
              '<button ' +
                'class="tutorial-btn tutorial-skip" ' +
                '@click="skipTutorial">' +
                'Skip Tutorial' +
              '</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</transition>' +
      '<button v-if="!active" class="tutorial-trigger-btn" @click="startTutorial">Show Tutorial</button>' +
    '</div>'
};
