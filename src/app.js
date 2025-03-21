// Main application

// Simple version of the app for basic functionality
const app = Vue.createApp({
  data() {
    return {
      // Game state
      gameStarted: false,
      isPaused: false,
      gameSpeed: 1,
      marketOpen: true,
      gameTime: {
        day: 1,
        hour: 9,
        minute: 30
      },
      marketHours: {
        open: 9, // 9 AM
        close: 16 // 4 PM
      },
      showTips: true,
      tipIndex: 0,
      tips: [
        "Buy low, sell high! Stock prices fluctuate based on market trends and sector performance.",
        "Watch sector trends closely. Stocks in the same sector often move together.",
        "Transaction fees can eat into your profits. Consider upgrading to reduce them.",
        "The overall market cycles between bull and bear phases. Plan accordingly!",
        "Achievements provide bonuses. Try to unlock them all!",
        "Some upgrades provide passive income. They can be worth the investment.",
        "Large purchases and sales can themselves affect stock prices.",
        "The market closes after 4 PM. No trading happens during closed hours.",
        "Look for news that affects specific stocks or entire sectors.",
        "Diversifying across different sectors can help manage risk."
      ],
      
      // Player data
      player: {
        name: 'Aspiring Tycoon',
        cash: 10000,
        netWorth: 10000,
        wealthLevel: 1,
        wealthStatusMessages: [
          'Barely getting by',
          'Middle class hero',
          'Local big shot',
          'Regional player',
          'National influencer',
          'Yacht owner',
          'Private jet enthusiast',
          'Island collector',
          'Space tourism pioneer',
          'Mars colony founder'
        ]
      },
      
      // Stocks data
      stocks: [
        { id: 1, name: 'TechGiant', symbol: 'TG', price: 150, change: 0, history: [], owned: 0, sector: 'tech' },
        { id: 2, name: 'BankCorp', symbol: 'BC', price: 80, change: 0, history: [], owned: 0, sector: 'finance' },
        { id: 3, name: 'OilFutures', symbol: 'OF', price: 65, change: 0, history: [], owned: 0, sector: 'energy' },
        { id: 4, name: 'GreenEnergy', symbol: 'GE', price: 45, change: 0, history: [], owned: 0, sector: 'energy' },
        { id: 5, name: 'FoodChain', symbol: 'FC', price: 30, change: 0, history: [], owned: 0, sector: 'consumer' },
        { id: 6, name: 'LuxuryBrand', symbol: 'LB', price: 120, change: 0, history: [], owned: 0, sector: 'consumer' },
        { id: 7, name: 'SocialMedia', symbol: 'SM', price: 90, change: 0, history: [], owned: 0, sector: 'tech' },
        { id: 8, name: 'MemeStock', symbol: 'MS', price: 10, change: 0, history: [], owned: 0, sector: 'consumer' },
        { id: 9, name: 'CryptoCorp', symbol: 'CC', price: 35, change: 0, history: [], owned: 0, sector: 'tech' },
        { id: 10, name: 'RealEstate', symbol: 'RE', price: 70, change: 0, history: [], owned: 0, sector: 'finance' }
      ],
      
      // Sector and market data
      sectors: {
        tech: { trend: 0, volatility: 0.15, name: 'Technology' },
        finance: { trend: 0, volatility: 0.10, name: 'Finance' },
        energy: { trend: 0, volatility: 0.12, name: 'Energy' },
        consumer: { trend: 0, volatility: 0.08, name: 'Consumer' }
      },
      marketTrend: 0, // -1 to 1, representing market direction
      marketCycle: 0, // Counter for market cycles
      
      // News and events
      newsItems: [
        { headline: 'TechGiant announces new AI assistant that reads your thoughts', effect: 'TechGiant +5%' },
        { headline: 'BankCorp CEO caught using company funds for gold-plated toilet', effect: 'BankCorp -8%' },
        { headline: 'OilFutures discovers ocean can be converted to fuel with "minimal" environmental impact', effect: 'OilFutures +12%' },
        { headline: 'GreenEnergy unveils solar panel that works at night, somehow', effect: 'GreenEnergy +15%' },
        { headline: 'FoodChain introduces burger that is "technically food"', effect: 'FoodChain -3%' }
      ],
      
      // Upgrades
      upgrades: [
        {
          id: 1,
          name: 'Financial Advisor',
          description: 'Hire someone to tell you what you already know, but with confidence',
          price: 5000,
          owned: false,
          effect: 'Reduces transaction fees by 50%'
        },
        {
          id: 2,
          name: 'Insider Trading Friend',
          description: 'Not technically illegal if you call it a "hunch"',
          price: 20000,
          owned: false,
          effect: 'Occasional tips about big market moves'
        },
        {
          id: 3,
          name: 'Algorithm Trading Bot',
          description: 'It uses AI, machine learning, and other buzzwords to make trades faster than humans',
          price: 50000,
          owned: false,
          effect: 'Generates $500 every minute'
        },
        {
          id: 4,
          name: 'Politician in Your Pocket',
          description: 'Lobbying is just friendship with benefits for your portfolio',
          price: 100000,
          owned: false,
          effect: 'Occasional favorable regulation changes for sectors'
        },
        {
          id: 5,
          name: 'Media Manipulation Machine',
          description: 'Control the narrative, control the market',
          price: 250000,
          owned: false,
          effect: 'Create your own news events (coming soon)'
        },
        {
          id: 6,
          name: 'Tax Haven Access',
          description: 'Your money goes on vacation and never comes back to the tax authority',
          price: 500000,
          owned: false,
          effect: 'Eliminates all transaction fees'
        }
      ],
      
      // Game settings and mechanics
      transactionFee: 0.01, // 1% fee on all transactions
      
      // Achievements
      achievements: [
        { id: 1, name: 'First Trade', description: 'Buy your first stock', achieved: false },
        { id: 2, name: 'Portfolio Diversity', description: 'Own at least 5 different stocks', achieved: false },
        { id: 3, name: 'Penny Pincher', description: 'Make a profit on a stock under $20', achieved: false },
        { id: 4, name: 'Big Spender', description: 'Buy 100 shares at once', achieved: false },
        { id: 5, name: 'Market Manipulator', description: 'Own more than 50% of one company', achieved: false },
        { id: 6, name: 'Millionaire', description: 'Reach a net worth of $1,000,000', achieved: false },
        { id: 7, name: 'Sector Specialist', description: 'Own all stocks in one sector', achieved: false },
        { id: 8, name: 'Market Crash Survivor', description: 'Keep a positive net worth during a market crash', achieved: false }
      ],
      
      // Intervals
      gameInterval: null,
      timeInterval: null,
      tipInterval: null
    };
  },
  computed: {
    netWorth() {
      const stocksValue = this.stocks.reduce((total, stock) => {
        return total + (stock.price * stock.owned);
      }, 0);
      return this.player.cash + stocksValue;
    },
    wealthPercentile() {
      // Satirical wealth meter - goes up to $1 billion
      const maxWealth = 1000000000;
      const percentage = (this.netWorth / maxWealth) * 100;
      return Math.min(percentage, 100).toFixed(4);
    },
    wealthStatus() {
      const level = Math.min(Math.floor(this.wealthPercentile * this.player.wealthStatusMessages.length / 100), this.player.wealthStatusMessages.length - 1);
      return this.player.wealthStatusMessages[level];
    },
    stocksBySector() {
      const result = {};
      
      for (const sectorKey in this.sectors) {
        result[sectorKey] = this.stocks.filter(stock => stock.sector === sectorKey);
      }
      
      return result;
    },
    isMarketHours() {
      return this.gameTime.hour >= this.marketHours.open && this.gameTime.hour < this.marketHours.close;
    }
  },
  watch: {
    isMarketHours(newValue, oldValue) {
      if (newValue !== oldValue) {
        if (newValue) {
          // Market just opened
          this.marketOpen = true;
          this.$refs.notifications.showAlert('Market Open', 'Trading has begun for the day');
        } else {
          // Market just closed
          this.marketOpen = false;
          this.$refs.notifications.showAlert('Market Closed', 'Trading has ended for the day');
        }
      }
    }
  },
  mounted() {
    // Show intro screen - game starts after user finishes intro
  },
  methods: {
    startGame(settings) {
      // Apply settings from intro screen
      if (settings.playerName) {
        this.player.name = settings.playerName;
      }
      
      if (settings.startCash) {
        this.player.cash = settings.startCash;
      }
      
      this.showTips = settings.showTips !== undefined ? settings.showTips : true;
      
      // Initialize the game
      this.gameStarted = true;
      
      // Initialize stock histories
      this.stocks.forEach(stock => {
        stock.history = Array(30).fill().map((_, i) => {
          const basePrice = stock.price * 0.8;
          return basePrice + (Math.random() * stock.price * 0.4);
        });
      });
      
      // Initialize market cycle
      this.updateMarketTrend();
      
      // Start game loops
      this.startGameLoop();
      this.startTimeLoop();
      
      // Start showing tips if enabled
      if (this.showTips) {
        this.startTipLoop();
        // Show first tip immediately
        this.$refs.notifications.showTip(this.tips[0]);
      }
      
      // Welcome notification
      this.$refs.notifications.showSuccess('Welcome to Satirical Stocks, ' + this.player.name + '!', 'Game Started');
    },
    updateMarketTrend() {
      // Update the overall market trend (cycles between bull and bear markets)
      this.marketCycle += 0.05;
      // Sine wave between -1 and 1 with random noise
      this.marketTrend = (Math.sin(this.marketCycle) * 0.8) + (Math.random() * 0.4 - 0.2);
      
      // Update sector trends based on market trend with some divergence
      for (const sectorKey in this.sectors) {
        const sector = this.sectors[sectorKey];
        // Each sector follows the market with some random divergence
        const divergence = (Math.random() * 0.6) - 0.3; // -0.3 to 0.3
        sector.trend = this.marketTrend + divergence;
        // Clamp to reasonable values
        sector.trend = Math.max(-1, Math.min(1, sector.trend));
      }
      
      // Generate market-wide news at certain thresholds
      if (this.marketTrend > 0.7 && Math.random() < 0.3) {
        const headline = 'Market surges on optimistic economic outlook - all sectors up';
        this.newsItems.unshift({
          headline: headline,
          effect: 'MARKET +5%'
        });
        
        // Show notification
        this.$refs.notifications.showMarketEvent(headline, 'All stocks trending up');
        
        // Trim news items
        if (this.newsItems.length > 5) this.newsItems.pop();
      } else if (this.marketTrend < -0.7 && Math.random() < 0.3) {
        const headline = 'Market plunges amid recession fears - investors in panic';
        this.newsItems.unshift({
          headline: headline,
          effect: 'MARKET -5%'
        });
        
        // Show notification
        this.$refs.notifications.showMarketEvent(headline, 'All stocks trending down');
        
        // Trim news items
        if (this.newsItems.length > 5) this.newsItems.pop();
      }
    },
    updatePrices() {
      // Only update if market is open and game is not paused
      if (!this.marketOpen || this.isPaused) return;
      
      // Occasionally update the market trends (every ~5 cycles)
      if (Math.random() < 0.2) {
        this.updateMarketTrend();
      }
      
      this.stocks.forEach(stock => {
        // Record previous price for history
        stock.history.push(stock.price);
        if (stock.history.length > 30) {
          stock.history.shift();
        }

        // Calculate new price based on:
        // 1. Overall market trend
        // 2. Sector-specific trend
        // 3. Stock-specific random component
        
        const sector = this.sectors[stock.sector];
        
        // Base volatility from sector
        const volatility = sector.volatility;
        
        // Market influence (30%)
        const marketInfluence = this.marketTrend * 0.03; // ±3% from market
        
        // Sector influence (40%)
        const sectorInfluence = sector.trend * 0.04; // ±4% from sector
        
        // Stock-specific randomness (30%)
        const randomFactor = (Math.random() - 0.5) * 2; // -1 to 1
        const randomInfluence = randomFactor * volatility * 0.03; // ±3% randomness based on sector volatility
        
        // Calculate overall change percentage
        const changePercent = marketInfluence + sectorInfluence + randomInfluence;
        const changeAmount = stock.price * changePercent;
        
        // Apply change to price
        const oldPrice = stock.price;
        stock.price = Math.max(1, stock.price + changeAmount);
        stock.change = ((stock.price - oldPrice) / oldPrice) * 100;
        
        // Add animation class for price movement
        if (stock.change > 0) {
          stock.priceChangeClass = 'price-up';
        } else if (stock.change < 0) {
          stock.priceChangeClass = 'price-down';
        }
        
        // Remove animation class after animation completes
        setTimeout(() => {
          stock.priceChangeClass = '';
        }, 1500);
      });

      // Update news occasionally
      if (Math.random() < 0.3) { // 30% chance of news each update
        this.generateNews();
      }

      // Update player's net worth
      this.player.netWorth = this.netWorth;
      
      // Check for achievements
      this.checkAchievements();
    },
    buyStock(stock, quantity = 1) {
      if (!this.marketOpen) {
        this.$refs.notifications.showError('Market is currently closed', 'Trading Halted');
        return;
      }
      
      const totalCost = stock.price * quantity;
      const transactionCost = totalCost * this.transactionFee;
      const totalWithFees = totalCost + transactionCost;
      
      if (this.player.cash >= totalWithFees) {
        this.player.cash -= totalWithFees;
        stock.owned += quantity;
        
        // Show transaction notification
        this.$refs.notifications.showTransactionComplete('buy', stock, quantity, totalWithFees);
        
        // Generate news about large purchases
        if (quantity >= 50) {
          const headline = this.player.name + ' buys ' + quantity + ' shares of ' + stock.name + ' - market takes notice';
          this.newsItems.unshift({
            headline: headline,
            effect: stock.symbol + ' +1.5%'
          });
          
          // Large purchases slightly increase the stock's price
          stock.price *= 1.015;
          if (this.newsItems.length > 5) {
            this.newsItems.pop();
          }
        }
        
        // First purchase achievement
        if (!this.achievements[0].achieved) {
          this.achievements[0].achieved = true;
          this.$refs.notifications.showAchievement(this.achievements[0]);
        }
        
        // Big spender achievement
        if (quantity >= 100 && !this.achievements[3].achieved) {
          this.achievements[3].achieved = true;
          this.$refs.notifications.showAchievement(this.achievements[3]);
        }
      } else {
        // Not enough cash
        this.$refs.notifications.showError('Not enough cash for this purchase', 'Transaction Failed');
      }
    },
    sellStock(stock, quantity = 1) {
      if (!this.marketOpen) {
        this.$refs.notifications.showError('Market is currently closed', 'Trading Halted');
        return;
      }
      
      if (stock.owned >= quantity) {
        const totalValue = stock.price * quantity;
        const transactionCost = totalValue * this.transactionFee;
        const totalAfterFees = totalValue - transactionCost;
        
        this.player.cash += totalAfterFees;
        stock.owned -= quantity;
        
        // Show transaction notification
        this.$refs.notifications.showTransactionComplete('sell', stock, quantity, totalAfterFees);
        
        // Generate news about large sales
        if (quantity >= 50) {
          const headline = this.player.name + ' dumps ' + quantity + ' shares of ' + stock.name + ' - investors concerned';
          this.newsItems.unshift({
            headline: headline,
            effect: stock.symbol + ' -1.5%'
          });
          
          // Large sales slightly decrease the stock's price
          stock.price *= 0.985;
          if (this.newsItems.length > 5) {
            this.newsItems.pop();
          }
        }
        
        // Check penny pincher achievement
        if (stock.price < 20 && stock.change > 0 && !this.achievements[2].achieved) {
          this.achievements[2].achieved = true;
          this.$refs.notifications.showAchievement(this.achievements[2]);
        }
      } else {
        // Not enough shares
        this.$refs.notifications.showError('Not enough shares to sell', 'Transaction Failed');
      }
    },
    generateNews() {
      const headlines = [
        { text: '{stock} CEO pays taxes "by accident," promises it won\'t happen again', effect: -0.05 },
        { text: '{stock} unveils product that\'s exactly like their last one but costs more', effect: 0.08 },
        { text: 'Workers at {stock} request livable wages, executives clutch pearls', effect: -0.07 },
        { text: '{stock} discovers way to monetize human emotions, stock soars', effect: 0.15 },
        { text: '{stock} rebrands as tech company despite selling shoes', effect: 0.1 },
        { text: 'Whistleblower reveals {stock} has been a Ponzi scheme all along', effect: -0.25 },
        { text: '{stock} announces record profits while cutting 10,000 jobs', effect: 0.12 },
        { text: '{stock} caught in accounting scandal, CFO claims "math is hard"', effect: -0.18 },
        { text: 'Millennials blamed for killing {stock} business model', effect: -0.08 },
        { text: '{stock} exploits legal loophole, saves billions', effect: 0.17 }
      ];

      // Pick a random stock and headline
      const randomStock = this.stocks[Math.floor(Math.random() * this.stocks.length)];
      const randomHeadline = headlines[Math.floor(Math.random() * headlines.length)];

      // Apply effect to stock price
      const effectPercent = randomHeadline.effect;
      const effectAmount = randomStock.price * effectPercent;
      randomStock.price = Math.max(1, randomStock.price + effectAmount);
      randomStock.change = effectPercent * 100;

      // Create news text
      const newsText = randomHeadline.text.replace('{stock}', randomStock.name);
      const effectText = randomStock.symbol + " " + (effectPercent > 0 ? '+' : '') + (effectPercent * 100).toFixed(1) + "%";
      
      // Add to news items
      this.newsItems.unshift({
        headline: newsText,
        effect: effectText
      });

      // Show notification
      this.$refs.notifications.showNewsUpdate(newsText, effectText);

      // Keep only the 5 most recent news items
      if (this.newsItems.length > 5) {
        this.newsItems.pop();
      }
    },
    checkAchievements() {
      // Portfolio diversity achievement
      if (!this.achievements[1].achieved) {
        const uniqueStocksOwned = this.stocks.filter(stock => stock.owned > 0).length;
        if (uniqueStocksOwned >= 5) {
          this.achievements[1].achieved = true;
          this.$refs.notifications.showAchievement(this.achievements[1]);
        }
      }
      
      // Market manipulator achievement
      if (!this.achievements[4].achieved) {
        const marketManipulator = this.stocks.some(stock => {
          // Let's say total shares per company is 1000 for simplicity
          return (stock.owned / 1000) > 0.5;
        });
        
        if (marketManipulator) {
          this.achievements[4].achieved = true;
          this.$refs.notifications.showAchievement(this.achievements[4]);
        }
      }
      
      // Millionaire achievement
      if (!this.achievements[5].achieved && this.netWorth >= 1000000) {
        this.achievements[5].achieved = true;
        this.$refs.notifications.showAchievement(this.achievements[5]);
      }
      
      // Sector specialist achievement
      if (!this.achievements[6].achieved) {
        for (const sectorKey in this.stocksBySector) {
          const sectorStocks = this.stocksBySector[sectorKey];
          const ownsAllInSector = sectorStocks.every(stock => stock.owned > 0);
          
          if (ownsAllInSector && sectorStocks.length > 0) {
            this.achievements[6].achieved = true;
            this.$refs.notifications.showAchievement(this.achievements[6]);
            break;
          }
        }
      }
      
      // Market crash survivor is checked during updateMarketTrend when a crash is detected
      if (this.marketTrend < -0.8 && this.netWorth > 0 && !this.achievements[7].achieved) {
        this.achievements[7].achieved = true;
        this.$refs.notifications.showAchievement(this.achievements[7]);
      }
    },
    buyUpgrade(upgrade) {
      if (this.player.cash >= upgrade.price && !upgrade.owned) {
        this.player.cash -= upgrade.price;
        upgrade.owned = true;
        
        // Apply upgrade effects
        this.applyUpgradeEffects(upgrade);
        
        // Show notification
        this.$refs.notifications.showSuccess('Upgrade purchased: ' + upgrade.name, 'Upgrade Activated');
      } else {
        // Not enough cash
        this.$refs.notifications.showError('Not enough cash for this upgrade', 'Purchase Failed');
      }
    },
    applyUpgradeEffects(upgrade) {
      // Implement different effects based on the upgrade
      switch(upgrade.id) {
        case 1: // Financial Advisor
          // Reduce transaction fees
          this.transactionFee = 0.005; // 0.5% fee instead of 1%
          break;
        case 2: // Insider Trading Friend
          // Will be implemented through occasional tips
          setInterval(() => {
            const randomStock = this.stocks[Math.floor(Math.random() * this.stocks.length)];
            const willGoUp = Math.random() > 0.5;
            
            const headline = 'Your insider friend whispers: "' + randomStock.name + ' will ' + (willGoUp ? 'rise' : 'fall') + ' soon."';
            this.newsItems.unshift({
              headline: headline,
              effect: 'TIP'
            });
            
            // Show notification
            this.$refs.notifications.showAlert(headline, 'Insider Tip');
            
            // Schedule the actual change to happen soon
            setTimeout(() => {
              const changeAmount = randomStock.price * (willGoUp ? 0.15 : -0.15);
              randomStock.price = Math.max(1, randomStock.price + changeAmount);
              randomStock.change = (willGoUp ? 15 : -15);
            }, 10000); // 10 seconds later
            
            if (this.newsItems.length > 5) {
              this.newsItems.pop();
            }
          }, 60000); // Once per minute
          break;
        case 3: // Algorithm Trading Bot
          // Auto-generates small profits each day
          setInterval(() => {
            if (this.marketOpen && !this.isPaused) {
              this.player.cash += 500;
              this.$refs.notifications.showSuccess('Your algorithm bot generated $500', 'Bot Profit');
            }
          }, 60000); // Once per minute in game time
          break;
        case 4: // Politician in Your Pocket
          // Occasional favorable regulation for a random sector
          setInterval(() => {
            if (this.marketOpen && !this.isPaused) {
              const sectors = Object.keys(this.sectors);
              const randomSector = sectors[Math.floor(Math.random() * sectors.length)];
              const sectorName = this.sectors[randomSector].name;
              
              const headline = 'New regulation benefits ' + sectorName + ' sector - your politician friend delivers';
              this.newsItems.unshift({
                headline: headline,
                effect: 'SECTOR BOOST'
              });
              
              // Show notification
              this.$refs.notifications.showMarketEvent(headline, sectorName + ' stocks rising');
              
              // Boost all stocks in the sector
              const sectorStocks = this.stocks.filter(stock => stock.sector === randomSector);
              sectorStocks.forEach(stock => {
                stock.price *= 1.1; // 10% boost
                stock.change = 10;
              });
              
              if (this.newsItems.length > 5) {
                this.newsItems.pop();
              }
            }
          }, 120000); // Every 2 minutes
          break;
        case 5: // Media Manipulation
          // Add a button to create custom news about a stock
          // This would normally be implemented through a UI element
          break;
        case 6: // Tax Haven
          // Reduces transaction fees to zero
          this.transactionFee = 0;
          break;
      }
    },
    togglePause() {
      this.isPaused = !this.isPaused;
      if (this.isPaused) {
        this.$refs.notifications.showAlert('Game paused', 'Pause');
      } else {
        this.$refs.notifications.showAlert('Game resumed', 'Resume');
      }
    },
    setGameSpeed(speed) {
      // Stop existing interval
      clearInterval(this.gameInterval);
      
      // Set new speed
      this.gameSpeed = speed;
      
      // Restart with new speed
      this.startGameLoop();
      
      // Notification
      this.$refs.notifications.showAlert('Game speed set to ' + speed + 'x', 'Speed Change');
    },
    toggleMarket() {
      this.marketOpen = !this.marketOpen;
      if (this.marketOpen) {
        this.$refs.notifications.showAlert('Market manually opened', 'Market Status');
      } else {
        this.$refs.notifications.showAlert('Market manually closed', 'Market Status');
      }
    },
    updateGameTime() {
      if (this.isPaused) return;
      
      // Advance time
      this.gameTime.minute += 5; // 5 minutes per tick
      
      // Handle hour change
      if (this.gameTime.minute >= 60) {
        this.gameTime.minute = 0;
        this.gameTime.hour++;
        
        // Handle day change
        if (this.gameTime.hour >= 24) {
          this.gameTime.hour = 0;
          this.gameTime.day++;
          this.$refs.notifications.showAlert('Day ' + this.gameTime.day + ' has begun', 'New Day');
        }
      }
    },
    showNextTip() {
      if (this.showTips) {
        this.tipIndex = (this.tipIndex + 1) % this.tips.length;
        this.$refs.notifications.showTip(this.tips[this.tipIndex]);
      }
    },
    saveGame() {
      this.$refs.notifications.showSuccess('Game saved! (Demo only)', 'Save Game');
    },
    loadGame() {
      this.$refs.notifications.showSuccess('Game loaded! (Demo only)', 'Load Game');
    },
    openSettings() {
      this.$refs.notifications.showAlert('Settings would open here', 'Settings');
    },
    startGameLoop() {
      const baseInterval = 5000; // 5 seconds base interval
      const scaledInterval = baseInterval / this.gameSpeed; // Adjust for game speed
      
      this.gameInterval = setInterval(() => {
        this.updatePrices();
      }, scaledInterval);
    },
    startTimeLoop() {
      this.timeInterval = setInterval(() => {
        this.updateGameTime();
      }, 1000); // Update game time every second
    },
    startTipLoop() {
      this.tipInterval = setInterval(() => {
        this.showNextTip();
      }, 120000); // Show a tip every 2 minutes
    }
  },
  beforeUnmount() {
    // Clean up intervals to prevent memory leaks
    clearInterval(this.gameInterval);
    clearInterval(this.timeInterval);
    clearInterval(this.tipInterval);
  },
  template: 
    '<div class="game-container">' +
      // Start screen when game not started
      '<intro-screen v-if="!gameStarted" @start-game="startGame"></intro-screen>' +
      
      // Game UI when game is started
      '<template v-else>' +
        '<header class="game-header">' +
          '<h1 class="game-title">Satirical Stocks: The Wealth Hoarding Simulator</h1>' +
          '<div class="header-controls">' +
            '<game-controls ' +
              ':is-paused="isPaused" ' +
              ':speed="gameSpeed" ' +
              ':market-open="marketOpen" ' +
              ':game-time="gameTime" ' +
              '@toggle-pause="togglePause" ' +
              '@set-speed="setGameSpeed" ' +
              '@toggle-market="toggleMarket" ' +
              '@save-game="saveGame" ' +
              '@load-game="loadGame" ' +
              '@open-settings="openSettings" ' +
            '></game-controls>' +
          '</div>' +
        '</header>' +
        
        '<div class="container">' +
          '<div class="dashboard">' +
            '<div class="stock-section">' +
              '<stock-chart :stocks="stocks"></stock-chart>' +
              
              '<portfolio ' +
                ':player="player" ' +
                ':stocks="stocks" ' +
                ':net-worth="netWorth" ' +
                '@buy-stock="buyStock" ' +
                '@sell-stock="sellStock"' +
              '></portfolio>' +
              
              '<div class="news-section">' +
                '<h2 class="news-title">' +
                  'Breaking News ' +
                  '<tooltip text="News events can significantly impact stock prices. Keep an eye out for sector-wide or company-specific news."></tooltip>' +
                '</h2>' +
                '<ul class="news-list">' +
                  '<li v-for="(item, index) in newsItems" :key="index" class="news-item">' +
                    '<div class="news-headline">{{ item.headline }}</div>' +
                    '<div class="news-effect">Effect: {{ item.effect }}</div>' +
                  '</li>' +
                '</ul>' +
              '</div>' +
              
              '<div class="market-trends">' +
                '<h2 class="market-title">' +
                  'Market Trends ' +
                  '<tooltip text="The overall market cycles between bull (positive) and bear (negative) phases. Each sector can trend differently from the overall market."></tooltip>' +
                '</h2>' +
                '<div class="market-indicator">' +
                  '<div class="indicator-label">Overall Market:</div>' +
                  '<div class="indicator-bar">' +
                    '<div class="indicator-value" :style="{ width: ((marketTrend + 1) * 50) + \'%\', backgroundColor: marketTrend >= 0 ? \'#4caf50\' : \'#f44336\' }"></div>' +
                  '</div>' +
                  '<div class="indicator-text">{{ marketTrend >= 0 ? "Bull Market" : "Bear Market" }} ({{ (marketTrend * 100).toFixed(1) }}%)</div>' +
                '</div>' +
                
                '<div class="sector-indicators">' +
                  '<div v-for="(sector, key) in sectors" :key="key" class="sector-indicator">' +
                    '<div class="indicator-label">{{ sector.name }}:</div>' +
                    '<div class="indicator-bar">' +
                      '<div class="indicator-value" :style="{ width: ((sector.trend + 1) * 50) + \'%\', backgroundColor: sector.trend >= 0 ? \'#4caf50\' : \'#f44336\' }"></div>' +
                    '</div>' +
                    '<div class="indicator-text">' +
                      '{{ sector.trend >= 0 ? "Bullish" : "Bearish" }} ' +
                      '({{ (sector.trend * 100).toFixed(1) }}%)' +
                    '</div>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
            
            '<div class="side-panel">' +
              '<div class="wealth-meter">' +
                '<h2 class="wealth-title">' +
                  'Wealth Hoarder Status ' +
                  '<tooltip text="This shows how far you\'ve climbed up the wealth ladder. Each level unlocks new status symbols."></tooltip>' +
                '</h2>' +
                '<div class="wealth-progress">' +
                  '<div class="wealth-bar" :style="{ width: wealthPercentile + \'%\' }"></div>' +
                '</div>' +
                '<div class="wealth-status">{{ wealthStatus }}</div>' +
                '<div class="wealth-percentile">You are wealthier than {{ wealthPercentile }}% of the population</div>' +
              '</div>' +
              
              '<div class="upgrade-shop">' +
                '<h2 class="upgrade-title">' +
                  'Ways to "Optimize" Your Wealth ' +
                  '<tooltip text="These upgrades provide permanent benefits to help accelerate your wealth growth. Some provide passive income!"></tooltip>' +
                '</h2>' +
                '<ul class="upgrade-list">' +
                  '<li v-for="upgrade in upgrades" :key="upgrade.id" class="upgrade-item">' +
                    '<div class="upgrade-info">' +
                      '<div class="upgrade-name">{{ upgrade.name }}</div>' +
                      '<div class="upgrade-description">{{ upgrade.description }}</div>' +
                      '<div class="upgrade-effect">{{ upgrade.effect }}</div>' +
                    '</div>' +
                    '<div class="upgrade-purchase">' +
                      '<span class="upgrade-price">${{ upgrade.price.toLocaleString() }}</span>' +
                      '<button ' +
                        'class="btn" ' +
                        '@click="buyUpgrade(upgrade)" ' +
                        ':disabled="player.cash < upgrade.price || upgrade.owned"' +
                      '>' +
                        '{{ upgrade.owned ? "Owned" : "Buy" }}' +
                      '</button>' +
                    '</div>' +
                  '</li>' +
                '</ul>' +
              '</div>' +
              
              '<div class="achievements">' +
                '<h2 class="achievements-title">' +
                  'Achievements ' +
                  '<tooltip text="Complete these challenges to prove your investing prowess. Each unlocked achievement provides a status boost."></tooltip>' +
                '</h2>' +
                '<ul class="achievements-list">' +
                  '<li v-for="achievement in achievements" :key="achievement.id" ' +
                      'class="achievement-item" ' +
                      ':class="{ \'achieved\': achievement.achieved }">' +
                    '<div class="achievement-name">{{ achievement.name }}</div>' +
                    '<div class="achievement-description">{{ achievement.description }}</div>' +
                  '</li>' +
                '</ul>' +
              '</div>' +
              
              '<div class="transaction-info">' +
                '<h3>Transaction Fee: {{ (transactionFee * 100).toFixed(1) }}%</h3>' +
                '<p>All buy/sell transactions incur this fee.</p>' +
                '<tooltip text="These fees represent broker commissions and market friction. Upgrades can reduce or eliminate these fees." position="left"></tooltip>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        
        '<footer class="game-footer">' +
          '<p>Satirical Stocks &copy; 2025 - Remember, it\'s just a game... unlike real wealth inequality!</p>' +
        '</footer>' +
        
        '<notification-system ref="notifications"></notification-system>' +
      '</template>' +
    '</div>'
});

// Register components
app.component('stock-chart', StockChart);
app.component('portfolio', Portfolio);
app.component('trade-quantity-selector', TradeQuantitySelector);
app.component('tooltip', Tooltip);
app.component('notification-system', NotificationSystem);
app.component('game-controls', GameControls);
app.component('intro-screen', IntroScreen);

// Mount the app
app.mount('#app');
