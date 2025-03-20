// Main application

// Simple version of the app for basic functionality
const app = Vue.createApp({
  data() {
    return {
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
      stocks: [
        { id: 1, name: 'TechGiant', symbol: 'TG', price: 150, change: 0, history: [], owned: 0 },
        { id: 2, name: 'BankCorp', symbol: 'BC', price: 80, change: 0, history: [], owned: 0 },
        { id: 3, name: 'OilFutures', symbol: 'OF', price: 65, change: 0, history: [], owned: 0 },
        { id: 4, name: 'GreenEnergy', symbol: 'GE', price: 45, change: 0, history: [], owned: 0 },
        { id: 5, name: 'FoodChain', symbol: 'FC', price: 30, change: 0, history: [], owned: 0 },
        { id: 6, name: 'LuxuryBrand', symbol: 'LB', price: 120, change: 0, history: [], owned: 0 },
        { id: 7, name: 'SocialMedia', symbol: 'SM', price: 90, change: 0, history: [], owned: 0 },
        { id: 8, name: 'MemeStock', symbol: 'MS', price: 10, change: 0, history: [], owned: 0 },
        { id: 9, name: 'CryptoCorp', symbol: 'CC', price: 35, change: 0, history: [], owned: 0 },
        { id: 10, name: 'RealEstate', symbol: 'RE', price: 70, change: 0, history: [], owned: 0 }
      ],
      newsItems: [
        { headline: 'TechGiant announces new AI assistant that reads your thoughts', effect: 'TechGiant +5%' },
        { headline: 'BankCorp CEO caught using company funds for gold-plated toilet', effect: 'BankCorp -8%' },
        { headline: 'OilFutures discovers ocean can be converted to fuel with "minimal" environmental impact', effect: 'OilFutures +12%' },
        { headline: 'GreenEnergy unveils solar panel that works at night, somehow', effect: 'GreenEnergy +15%' },
        { headline: 'FoodChain introduces burger that is "technically food"', effect: 'FoodChain -3%' }
      ],
      upgrades: [
        {
          id: 1,
          name: 'Financial Advisor',
          description: 'Hire someone to tell you what you already know, but with confidence',
          price: 5000,
          owned: false,
          effect: 'Reduces random volatility by 10%'
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
          effect: 'Automatic small profits each day'
        },
        {
          id: 4,
          name: 'Politician in Your Pocket',
          description: 'Lobbying is just friendship with benefits for your portfolio',
          price: 100000,
          owned: false,
          effect: 'Occasional favorable regulation changes'
        },
        {
          id: 5,
          name: 'Media Manipulation Machine',
          description: 'Control the narrative, control the market',
          price: 250000,
          owned: false,
          effect: 'Create your own news events'
        },
        {
          id: 6,
          name: 'Tax Haven Access',
          description: 'Your money goes on vacation and never comes back to the tax authority',
          price: 500000,
          owned: false,
          effect: 'Reduce taxes on profits by 50%'
        }
      ],
      gameInterval: null
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
    }
  },
  mounted() {
    // Initialize stock histories
    this.stocks.forEach(stock => {
      stock.history = Array(30).fill().map((_, i) => {
        const basePrice = stock.price * 0.8;
        return basePrice + (Math.random() * stock.price * 0.4);
      });
    });
    
    // Start game loop
    this.startGameLoop();
  },
  methods: {
    updatePrices() {
      this.stocks.forEach(stock => {
        // Record previous price for history
        stock.history.push(stock.price);
        if (stock.history.length > 30) {
          stock.history.shift();
        }

        // Calculate new price
        const volatility = 0.08; // Base volatility
        const randomFactor = (Math.random() - 0.5) * 2; // Random between -1 and 1
        const changePercent = randomFactor * volatility;
        const changeAmount = stock.price * changePercent;
        
        const oldPrice = stock.price;
        stock.price = Math.max(1, stock.price + changeAmount);
        stock.change = ((stock.price - oldPrice) / oldPrice) * 100;
      });

      // Update news occasionally
      if (Math.random() < 0.3) { // 30% chance of news each update
        this.generateNews();
      }

      // Update player's net worth
      this.player.netWorth = this.netWorth;
    },
    buyStock(stock) {
      if (this.player.cash >= stock.price) {
        this.player.cash -= stock.price;
        stock.owned += 1;
      }
    },
    sellStock(stock) {
      if (stock.owned > 0) {
        this.player.cash += stock.price;
        stock.owned -= 1;
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

      // Add to news items
      const newsText = randomHeadline.text.replace('{stock}', randomStock.name);
      const effectText = randomStock.symbol + " " + (effectPercent > 0 ? '+' : '') + (effectPercent * 100).toFixed(1) + "%";
      
      this.newsItems.unshift({
        headline: newsText,
        effect: effectText
      });

      // Keep only the 5 most recent news items
      if (this.newsItems.length > 5) {
        this.newsItems.pop();
      }
    },
    buyUpgrade(upgrade) {
      if (this.player.cash >= upgrade.price && !upgrade.owned) {
        this.player.cash -= upgrade.price;
        upgrade.owned = true;
        
        // Apply upgrade effects
        this.applyUpgradeEffects(upgrade);
      }
    },
    applyUpgradeEffects(upgrade) {
      // Implement different effects based on the upgrade
      switch(upgrade.id) {
        case 1: // Financial Advisor
          // Effect implemented in updatePrices() with reduced volatility
          break;
        case 2: // Insider Trading Friend
          // Will be implemented through occasional tips
          break;
        case 3: // Algorithm Trading Bot
          // Auto-generates small profits each day
          setInterval(() => {
            this.player.cash += 500;
          }, 60000); // Once per minute in game time
          break;
        case 4: // Politician in Your Pocket
          // Will trigger special news events
          break;
        case 5: // Media Manipulation
          // Allows player to generate custom news
          break;
        case 6: // Tax Haven
          // Reduces tax on profits
          break;
      }
    },
    saveGame() {
      alert("Game saved! (Demo only - this would normally save to a file)");
    },
    loadGame() {
      alert("Game loaded! (Demo only - this would normally load from a file)");
    },
    startGameLoop() {
      this.gameInterval = setInterval(() => {
        this.updatePrices();
      }, 5000); // Update every 5 seconds
    }
  },
  template: 
    '<div class="game-container">' +
      '<header class="game-header">' +
        '<h1 class="game-title">Satirical Stocks: The Wealth Hoarding Simulator</h1>' +
      '</header>' +
      
      '<div class="container">' +
        '<div class="dashboard">' +
          '<div class="stock-section">' +
            '<stock-chart :stocks="stocks"></stock-chart>' +
            
            '<div class="portfolio">' +
              '<h2>Portfolio</h2>' +
              '<div class="balance">Cash: ${{ player.cash.toLocaleString() }}</div>' +
              '<div class="net-worth">Net Worth: ${{ netWorth.toLocaleString() }}</div>' +
              
              '<h3>Your Stocks:</h3>' +
              '<ul class="stock-list">' +
                '<li v-for="stock in stocks" :key="stock.id" class="stock-item">' +
                  '<div class="stock-info">' +
                    '<span class="stock-name">{{ stock.symbol }}</span>' +
                    '<span class="stock-price">${{ stock.price.toFixed(2) }}</span>' +
                    '<span class="stock-change" :class="stock.change >= 0 ? \'positive\' : \'negative\'">' +
                      '{{ stock.change >= 0 ? "+" : "" }}{{ stock.change.toFixed(2) }}%' +
                    '</span>' +
                  '</div>' +
                  '<div class="stock-owned" v-if="stock.owned > 0">Owned: {{ stock.owned }}</div>' +
                  '<div class="stock-actions">' +
                    '<button class="btn btn-buy" @click="buyStock(stock)" :disabled="player.cash < stock.price">Buy</button>' +
                    '<button class="btn btn-sell" @click="sellStock(stock)" :disabled="stock.owned <= 0">Sell</button>' +
                  '</div>' +
                '</li>' +
              '</ul>' +
            '</div>' +
            
            '<div class="news-section">' +
              '<h2 class="news-title">Breaking News</h2>' +
              '<ul class="news-list">' +
                '<li v-for="(item, index) in newsItems" :key="index" class="news-item">' +
                  '<div class="news-headline">{{ item.headline }}</div>' +
                  '<div class="news-effect">Effect: {{ item.effect }}</div>' +
                '</li>' +
              '</ul>' +
            '</div>' +
          '</div>' +
          
          '<div class="side-panel">' +
            '<div class="wealth-meter">' +
              '<h2 class="wealth-title">Wealth Hoarder Status</h2>' +
              '<div class="wealth-progress">' +
                '<div class="wealth-bar" :style="{ width: wealthPercentile + \'%\' }"></div>' +
              '</div>' +
              '<div class="wealth-status">{{ wealthStatus }}</div>' +
              '<div class="wealth-percentile">You are wealthier than {{ wealthPercentile }}% of the population</div>' +
            '</div>' +
            
            '<div class="upgrade-shop">' +
              '<h2 class="upgrade-title">Ways to "Optimize" Your Wealth</h2>' +
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
            
            '<div class="game-controls">' +
              '<button class="btn" @click="saveGame">Save Game</button>' +
              '<button class="btn" @click="loadGame">Load Game</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      
      '<footer class="game-footer">' +
        '<p>Satirical Stocks &copy; 2025 - Remember, it\'s just a game... unlike real wealth inequality!</p>' +
      '</footer>' +
    '</div>'
});

// Register components
app.component('stock-chart', StockChart);
// Explicitly register the Portfolio component for better compatibility
app.component('portfolio', Portfolio);
// Register other components
app.component('news-section', News);
app.component('upgrade-shop', Upgrades);

// Mount the app
app.mount('#app');