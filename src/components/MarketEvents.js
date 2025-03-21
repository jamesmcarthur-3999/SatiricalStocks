// Market Events System
var MarketEvents = {
  data: function() {
    return {
      events: [
        {
          id: 'bubble',
          name: 'Market Bubble',
          description: 'Irrational exuberance has swept the markets! Everyone is buying without looking at fundamentals.',
          duration: 4,
          effect: function(app) {
            // All stocks temporarily boom
            app.stocks.forEach(stock => {
              stock.price *= (1 + (Math.random() * 0.3 + 0.1)); // 10-40% increase
              stock.change = Math.random() * 20 + 10; // 10-30% change displayed
            });
            
            // Market and sectors all go bullish
            app.marketTrend = 0.8 + (Math.random() * 0.2); // 0.8-1.0
            for (const sectorKey in app.sectors) {
              app.sectors[sectorKey].trend = 0.7 + (Math.random() * 0.3); // 0.7-1.0
            }
            
            // Add news about bubble
            app.newsItems.unshift({
              headline: 'BUBBLE ALERT: Market in state of "irrational exuberance" says economist',
              effect: 'ALL SECTORS BOOMING'
            });
            
            if (app.newsItems.length > 5) app.newsItems.pop();
            
            // Return cleanup function
            return function(app) {
              // 50% chance of bubble popping into crash
              if (Math.random() < 0.5) {
                app.triggerMarketEvent('crash');
              } else {
                // Just cool down
                app.marketTrend = 0.3;
                for (const sectorKey in app.sectors) {
                  app.sectors[sectorKey].trend = 0.2 + (Math.random() * 0.2); // 0.2-0.4
                }
                
                app.newsItems.unshift({
                  headline: 'Market cools down as bubble deflates gradually',
                  effect: 'MARKET STABILIZING'
                });
                
                if (app.newsItems.length > 5) app.newsItems.pop();
              }
            };
          }
        },
        {
          id: 'crash',
          name: 'Market Crash',
          description: 'The bubble has burst! Investors are panic selling and the market is in freefall.',
          duration: 3,
          effect: function(app) {
            // Create dramatic market crash with animated effect
            app.$refs.notifications.showMarketEvent('💥 MARKET CRASH! 💥', 'Panic selling across all sectors!', 10000);
            
            // Apply crash to stocks gradually over multiple updates
            const crashStocks = () => {
              const randomStocks = [...app.stocks].sort(() => Math.random() - 0.5).slice(0, 3);
              randomStocks.forEach(stock => {
                stock.price *= (0.6 + (Math.random() * 0.2)); // 60-80% of value (20-40% drop)
                stock.change = -(Math.random() * 15 + 10); // -10% to -25% change displayed
              });
            };
            
            // Initial crash
            crashStocks();
            
            // Schedule more crashes
            const crash2 = setTimeout(() => { 
              if (!app.isPaused) crashStocks();
            }, 5000);
            
            const crash3 = setTimeout(() => {
              if (!app.isPaused) crashStocks();
            }, 10000);
            
            // Set market trends to extremely bearish
            app.marketTrend = -0.9 - (Math.random() * 0.1); // -0.9 to -1.0
            for (const sectorKey in app.sectors) {
              app.sectors[sectorKey].trend = -0.7 - (Math.random() * 0.3); // -0.7 to -1.0
            }
            
            // Add news about crash
            app.newsItems.unshift({
              headline: 'MARKET CRASH: Stocks in freefall as panic grips investors',
              effect: 'ALL SECTORS CRASHING'
            });
            
            if (app.newsItems.length > 5) app.newsItems.pop();
            
            // Return cleanup function that also clears timeouts if event ends early
            return function(app) {
              clearTimeout(crash2);
              clearTimeout(crash3);
              
              // Market starts recovery
              app.marketTrend = -0.4;
              for (const sectorKey in app.sectors) {
                app.sectors[sectorKey].trend = -0.3 + (Math.random() * 0.5 - 0.2); // -0.5 to 0.2
              }
              
              app.newsItems.unshift({
                headline: 'Markets begin to stabilize after historic crash',
                effect: 'RECOVERY STARTING'
              });
              
              if (app.newsItems.length > 5) app.newsItems.pop();
              
              // Check crash survivor achievement
              if (app.netWorth > 0 && !app.achievements[7].achieved) {
                app.achievements[7].achieved = true;
                app.$refs.notifications.showAchievement(app.achievements[7]);
              }
            };
          }
        },
        {
          id: 'techBoom',
          name: 'Tech Sector Boom',
          description: 'The technology sector is experiencing unprecedented growth!',
          duration: 5,
          effect: function(app) {
            // Make tech sector boom
            app.sectors.tech.trend = 0.9;
            
            // All tech stocks surge
            app.stocks.filter(stock => stock.sector === 'tech').forEach(stock => {
              stock.price *= (1 + (Math.random() * 0.4 + 0.2)); // 20-60% increase
              stock.change = Math.random() * 25 + 15; // 15-40% change displayed
            });
            
            app.newsItems.unshift({
              headline: 'Tech stocks soar as investors bet on digital future',
              effect: 'TECH SECTOR +30%'
            });
            
            if (app.newsItems.length > 5) app.newsItems.pop();
            
            return function(app) {
              // Tech boom ends, sector normalizes
              app.sectors.tech.trend = 0.2;
            };
          }
        },
        {
          id: 'energyCrisis',
          name: 'Energy Crisis',
          description: 'Global supply issues have caused an energy crisis!',
          duration: 4,
          effect: function(app) {
            // Energy sector volatility increases
            app.sectors.energy.volatility *= 2;
            
            // Conventional energy (OilFutures) initially booms
            const oilStock = app.stocks.find(stock => stock.symbol === 'OF');
            if (oilStock) {
              oilStock.price *= 1.5;
              oilStock.change = 50;
            }
            
            // Green energy initially drops as people fear renewable shortfalls
            const greenStock = app.stocks.find(stock => stock.symbol === 'GE');
            if (greenStock) {
              greenStock.price *= 0.8;
              greenStock.change = -20;
            }
            
            app.newsItems.unshift({
              headline: 'Energy crisis grips global markets as supply chains break down',
              effect: 'ENERGY SECTOR VOLATILE'
            });
            
            if (app.newsItems.length > 5) app.newsItems.pop();
            
            // Schedule a reversal halfway through the event
            const reversal = setTimeout(() => {
              if (app.isPaused) return;
              
              app.newsItems.unshift({
                headline: 'Governments announce shift to renewables amid energy crisis',
                effect: 'GREEN ENERGY +40%'
              });
              
              if (app.newsItems.length > 5) app.newsItems.pop();
              
              // Reverse the trends - green energy booms, oil drops
              if (oilStock) {
                oilStock.price *= 0.7;
                oilStock.change = -30;
              }
              
              if (greenStock) {
                greenStock.price *= 1.6;
                greenStock.change = 60;
              }
            }, 10000);
            
            return function(app) {
              clearTimeout(reversal);
              
              // Restore energy sector volatility
              app.sectors.energy.volatility /= 2;
            };
          }
        },
        {
          id: 'financialScandal',
          name: 'Financial Sector Scandal',
          description: 'A major financial institution has been caught in a massive fraud scandal!',
          duration: 3,
          effect: function(app) {
            // Financial sector takes a hit
            app.sectors.finance.trend = -0.7;
            
            // All finance stocks drop
            app.stocks.filter(stock => stock.sector === 'finance').forEach(stock => {
              stock.price *= (0.7 + (Math.random() * 0.1)); // 70-80% of value (20-30% drop)
              stock.change = -(Math.random() * 20 + 10); // -10% to -30% change displayed
            });
            
            app.newsItems.unshift({
              headline: 'Major financial scandal rocks markets, fraud investigations begin',
              effect: 'FINANCE SECTOR -25%'
            });
            
            if (app.newsItems.length > 5) app.newsItems.pop();
            
            return function(app) {
              // Scandal fades, sector begins to recover
              app.sectors.finance.trend = -0.1;
              
              app.newsItems.unshift({
                headline: 'Financial institutions pledge reforms after industry scandal',
                effect: 'FINANCE STABILIZING'
              });
              
              if (app.newsItems.length > 5) app.newsItems.pop();
            };
          }
        },
        {
          id: 'consumerBoom',
          name: 'Consumer Spending Boom',
          description: 'Consumer confidence has reached record levels, driving a shopping frenzy!',
          duration: 4,
          effect: function(app) {
            // Consumer sector trends up strongly
            app.sectors.consumer.trend = 0.8;
            
            // All consumer stocks increase
            app.stocks.filter(stock => stock.sector === 'consumer').forEach(stock => {
              stock.price *= (1 + (Math.random() * 0.2 + 0.1)); // 10-30% increase
              stock.change = Math.random() * 15 + 5; // 5-20% change displayed
            });
            
            app.newsItems.unshift({
              headline: 'Consumer spending reaches record levels, retail stocks surge',
              effect: 'CONSUMER SECTOR +15%'
            });
            
            if (app.newsItems.length > 5) app.newsItems.pop();
            
            return function(app) {
              // Spending boom ends
              app.sectors.consumer.trend = 0.1;
              
              app.newsItems.unshift({
                headline: 'Consumer spending normalizes after holiday season boom',
                effect: 'CONSUMER SECTOR COOLING'
              });
              
              if (app.newsItems.length > 5) app.newsItems.pop();
            };
          }
        }
      ],
      activeEvent: null,
      eventCleanupFunction: null,
      eventEndTimer: null,
      showEventModal: false
    };
  },
  methods: {
    getEventById: function(eventId) {
      return this.events.find(event => event.id === eventId);
    },
    triggerRandomEvent: function(app) {
      // Don't trigger if an event is already active
      if (this.activeEvent) return;
      
      // Select random event
      const randomEvent = this.events[Math.floor(Math.random() * this.events.length)];
      this.triggerSpecificEvent(randomEvent.id, app);
    },
    triggerSpecificEvent: function(eventId, app) {
      // Find the event
      const event = this.getEventById(eventId);
      if (!event) return;
      
      // Don't trigger if an event is already active
      if (this.activeEvent) {
        this.endCurrentEvent(app);
      }
      
      // Set as active event
      this.activeEvent = event;
      
      // Show event modal
      this.showEventModal = true;
      
      // Apply event effects
      if (typeof event.effect === 'function') {
        this.eventCleanupFunction = event.effect(app);
      }
      
      // Show notification
      app.$refs.notifications.showMarketEvent('MAJOR EVENT: ' + event.name, event.description, 8000);
      
      // Schedule event end
      const durationMs = (event.duration || 3) * 60 * 1000; // Convert minutes to ms
      this.eventEndTimer = setTimeout(() => {
        if (!app.isPaused) {
          this.endCurrentEvent(app);
        }
      }, durationMs);
    },
    endCurrentEvent: function(app) {
      if (!this.activeEvent) return;
      
      // Run cleanup function if it exists
      if (typeof this.eventCleanupFunction === 'function') {
        this.eventCleanupFunction(app);
      }
      
      // Clear timeout
      if (this.eventEndTimer) {
        clearTimeout(this.eventEndTimer);
        this.eventEndTimer = null;
      }
      
      // Reset active event
      this.activeEvent = null;
      
      // Hide modal
      this.showEventModal = false;
    },
    closeEventModal: function() {
      this.showEventModal = false;
    }
  },
  template: 
    '<div>' +
      '<transition name="modal">' +
        '<div v-if="showEventModal && activeEvent" class="event-modal-overlay" @click="closeEventModal">' +
          '<div class="event-modal" @click.stop>' +
            '<div class="event-modal-header">' +
              '<h2>{{ activeEvent.name }}</h2>' +
              '<button class="modal-close" @click="closeEventModal">&times;</button>' +
            '</div>' +
            '<div class="event-modal-body">' +
              '<p class="event-description">{{ activeEvent.description }}</p>' +
              '<div class="event-duration">Event duration: {{ activeEvent.duration }} minutes</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</transition>' +
    '</div>'
};
