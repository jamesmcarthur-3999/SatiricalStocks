// Stock Details Component
var StockDetails = {
  props: {
    stock: {
      type: Object,
      required: true
    },
    sector: {
      type: Object,
      required: true
    },
    transactionFee: {
      type: Number,
      default: 0.01
    },
    playerCash: {
      type: Number,
      required: true
    }
  },
  data: function() {
    return {
      quantity: 1,
      analysisTab: 'overview', // overview, technical, financials
      showModal: false,
      stockFacts: [
        "The CEO owns a yacht named '{stock} Profit'",
        "Founded in 2010 by a college dropout with 'a vision'",
        "Headquarters features a slide instead of stairs",
        "Employee retention rate is suspiciously low",
        "Has rebranded 4 times in the last decade",
        "CEO publicly claims to work 120 hours per week",
        "Board members include 3 family pets",
        "Maintains a 'creative accounting' department",
        "Executives receive $1 salary (plus $50M in stock options)",
        "Has never paid taxes in any jurisdiction",
        "Quarterly earnings calls feature interpretive dance",
        "Has more lawyers than engineers"
      ],
      companyMetrics: {
        pe: 0,
        dividendYield: 0,
        marketCap: 0,
        volatility: 0,
        momentum: 0
      }
    };
  },
  computed: {
    priceClass() {
      if (this.stock.change > 0) return 'positive';
      if (this.stock.change < 0) return 'negative';
      return '';
    },
    changeFormatted() {
      const sign = this.stock.change >= 0 ? '+' : '';
      return sign + this.stock.change.toFixed(2) + '%';
    },
    historyChartData() {
      return {
        labels: Array(this.stock.history.length).fill().map((_, i) => 'Day ' + (i+1)),
        datasets: [{
          label: this.stock.symbol + ' Price History',
          data: this.stock.history,
          borderColor: this.stock.change >= 0 ? '#4caf50' : '#f44336',
          backgroundColor: 'rgba(0,0,0,0.1)',
          borderWidth: 2,
          tension: 0.4
        }]
      };
    },
    maxBuyQuantity() {
      return Math.floor(this.playerCash / (this.stock.price * (1 + this.transactionFee)));
    },
    totalCost() {
      return this.stock.price * this.quantity * (1 + this.transactionFee);
    },
    totalSaleValue() {
      return this.stock.price * this.quantity * (1 - this.transactionFee);
    },
    randomFact() {
      const randomIndex = Math.floor(Math.random() * this.stockFacts.length);
      return this.stockFacts[randomIndex].replace('{stock}', this.stock.name);
    },
    sectorTrend() {
      if (this.sector.trend > 0.5) return { text: 'Strongly Bullish', class: 'strong-positive' };
      if (this.sector.trend > 0) return { text: 'Bullish', class: 'positive' };
      if (this.sector.trend > -0.5) return { text: 'Bearish', class: 'negative' };
      return { text: 'Strongly Bearish', class: 'strong-negative' };
    },
    sectorIcon() {
      const icons = {
        tech: '💻',
        finance: '💰',
        energy: '⚡',
        consumer: '🛒'
      };
      return icons[this.stock.sector] || '📈';
    },
    sectorName() {
      return this.sector.name;
    }
  },
  methods: {
    show() {
      this.showModal = true;
      this.generateRandomMetrics();
      // Draw chart on next tick after DOM is updated
      this.$nextTick(() => {
        this.drawHistoryChart();
      });
    },
    hide() {
      this.showModal = false;
    },
    setTab(tab) {
      this.analysisTab = tab;
      // If switching to technical tab, redraw chart
      if (tab === 'technical') {
        this.$nextTick(() => {
          this.drawHistoryChart();
        });
      }
    },
    drawHistoryChart() {
      const ctx = this.$refs.historyChart;
      if (!ctx) return;
      
      // Check if chart instance already exists and destroy it
      if (this.chart) {
        this.chart.destroy();
      }
      
      // Create new chart
      this.chart = new Chart(ctx, {
        type: 'line',
        data: this.historyChartData,
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: false
            }
          },
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });
    },
    generateRandomMetrics() {
      // Generate realistic but random company metrics
      this.companyMetrics = {
        pe: (Math.random() * 50 + 10).toFixed(2),
        dividendYield: (Math.random() * 5).toFixed(2) + '%',
        marketCap: '$' + (Math.random() * 200 + 1).toFixed(1) + 'B',
        volatility: (Math.random() * 2 + 0.5).toFixed(2),
        momentum: this.stock.change > 0 ? 'Positive' : 'Negative'
      };
    },
    setQuantity(qty) {
      this.quantity = qty;
    },
    buyStock() {
      this.$emit('buy-stock', this.stock, this.quantity);
    },
    sellStock() {
      this.$emit('sell-stock', this.stock, this.quantity);
    }
  },
  beforeDestroy() {
    // Clean up chart if component is destroyed
    if (this.chart) {
      this.chart.destroy();
    }
  },
  template: 
    '<div class="stock-details">' +
      '<transition name="modal">' +
        '<div v-if="showModal" class="modal-overlay" @click="hide">' +
          '<div class="modal-content" @click.stop>' +
            '<div class="modal-header">' +
              '<div class="stock-header-info">' +
                '<div class="stock-sector-badge">' +
                  '<span class="sector-icon">{{ sectorIcon }}</span>' +
                  '<span class="sector-name">{{ sectorName }}</span>' +
                '</div>' +
                '<h2>{{ stock.name }} ({{ stock.symbol }})</h2>' +
                '<div class="stock-price-info">' +
                  '<div class="stock-current-price">${{ stock.price.toFixed(2) }}</div>' +
                  '<div class="stock-price-change" :class="priceClass">{{ changeFormatted }}</div>' +
                '</div>' +
              '</div>' +
              '<button class="modal-close" @click="hide">&times;</button>' +
            '</div>' +
            
            '<div class="modal-tabs">' +
              '<button ' +
                'class="tab-button" ' +
                ':class="{ active: analysisTab === \'overview\' }" ' +
                '@click="setTab(\'overview\')">' +
                'Overview' +
              '</button>' +
              '<button ' +
                'class="tab-button" ' +
                ':class="{ active: analysisTab === \'technical\' }" ' +
                '@click="setTab(\'technical\')">' +
                'Technical Analysis' +
              '</button>' +
              '<button ' +
                'class="tab-button" ' +
                ':class="{ active: analysisTab === \'financials\' }" ' +
                '@click="setTab(\'financials\')">' +
                'Financials' +
              '</button>' +
            '</div>'+
            
            '<div class="modal-body">' +
              '<!-- Overview Tab -->' +
              '<div v-if="analysisTab === \'overview\'" class="tab-content">' +
                '<div class="company-overview">' +
                  '<h3>Company Overview</h3>' +
                  '<div class="company-description">' +
                    '<p>{{ stock.name }} is a leading company in the {{ sectorName }} sector, known for its innovative yet questionable business practices.</p>' +
                    '<p class="company-fact"><strong>Fun Fact:</strong> {{ randomFact }}</p>' +
                  '</div>' +
                  
                  '<div class="market-position">' +
                    '<h4>Market Position</h4>' +
                    '<div class="position-item">' +
                      '<span class="position-label">Sector Trend:</span>' +
                      '<span class="position-value" :class="sectorTrend.class">{{ sectorTrend.text }}</span>' +
                    '</div>' +
                    '<div class="position-item">' +
                      '<span class="position-label">Volatility:</span>' +
                      '<span class="position-value">{{ companyMetrics.volatility }}</span>' +
                    '</div>' +
                    '<div class="position-item">' +
                      '<span class="position-label">Market Cap:</span>' +
                      '<span class="position-value">{{ companyMetrics.marketCap }}</span>' +
                    '</div>' +
                  '</div>' +
                '</div>' +
                
                '<div class="trading-panel">' +
                  '<h3>Trade This Stock</h3>' +
                  '<div class="trade-quantity">' +
                    '<trade-quantity-selector ' +
                      ':value="quantity" ' +
                      ':max-quantity="Math.max(stock.owned, maxBuyQuantity)" ' +
                      '@update="setQuantity" ' +
                    '></trade-quantity-selector>' +
                  '</div>' +
                  
                  '<div class="trade-preview">' +
                    '<div class="preview-purchase" v-if="quantity > 0">' +
                      '<div class="preview-label">Purchase Cost:</div>' +
                      '<div class="preview-value">${{ totalCost.toFixed(2) }}</div>' +
                      '<div class="preview-note">(Includes {{ (transactionFee * 100).toFixed(1) }}% fee)</div>' +
                    '</div>' +
                    
                    '<div class="preview-sale" v-if="quantity > 0 && stock.owned > 0">' +
                      '<div class="preview-label">Sale Value:</div>' +
                      '<div class="preview-value">${{ totalSaleValue.toFixed(2) }}</div>' +
                      '<div class="preview-note">(After {{ (transactionFee * 100).toFixed(1) }}% fee)</div>' +
                    '</div>' +
                  '</div>' +
                  
                  '<div class="trade-buttons">' +
                    '<button ' +
                      'class="btn btn-buy" ' +
                      '@click="buyStock" ' +
                      ':disabled="playerCash < totalCost">' +
                      'Buy {{ quantity }}' +
                    '</button>' +
                    '<button ' +
                      'class="btn btn-sell" ' +
                      '@click="sellStock" ' +
                      ':disabled="stock.owned < quantity">' +
                      'Sell {{ quantity }}' +
                    '</button>' +
                  '</div>' +
                  
                  '<div class="holdings-info" v-if="stock.owned > 0">' +
                    '<div class="holdings-label">Current Holdings:</div>' +
                    '<div class="holdings-value">{{ stock.owned }} shares</div>' +
                    '<div class="holdings-value">${{ (stock.owned * stock.price).toFixed(2) }}</div>' +
                  '</div>' +
                '</div>' +
              '</div>' +
              
              '<!-- Technical Analysis Tab -->' +
              '<div v-if="analysisTab === \'technical\'" class="tab-content">' +
                '<h3>Price History</h3>' +
                '<div class="chart-container">' +
                  '<canvas ref="historyChart"></canvas>' +
                '</div>' +
                
                '<div class="technical-indicators">' +
                  '<h4>Technical Indicators</h4>' +
                  '<div class="indicator-item">' +
                    '<div class="indicator-name">Momentum:</div>' +
                    '<div class="indicator-value" :class="stock.change >= 0 ? \'positive\' : \'negative\'">' +
                      '{{ companyMetrics.momentum }}' +
                    '</div>' +
                  '</div>' +
                  '<div class="indicator-item">' +
                    '<div class="indicator-name">Sector Correlation:</div>' +
                    '<div class="indicator-value">Strong</div>' +
                  '</div>' +
                  '<div class="indicator-item">' +
                    '<div class="indicator-name">50-Day Moving Average:</div>' +
                    '<div class="indicator-value">' +
                      '${{ (stock.price * (1 + (Math.random() * 0.2 - 0.1))).toFixed(2) }}' +
                    '</div>' +
                  '</div>' +
                  '<div class="indicator-item">' +
                    '<div class="indicator-name">200-Day Moving Average:</div>' +
                    '<div class="indicator-value">' +
                      '${{ (stock.price * (1 + (Math.random() * 0.3 - 0.15))).toFixed(2) }}' +
                    '</div>' +
                  '</div>' +
                '</div>' +
                
                '<div class="analyst-recommendations">' +
                  '<h4>Analyst Recommendations</h4>' +
                  '<div class="recommendation-item" :class="stock.change >= 10 ? \'positive\' : stock.change <= -10 ? \'negative\' : \'\'">' +
                    '<div class="recommendation-rating">' +
                      '{{ stock.change >= 10 ? "Strong Buy" : stock.change >= 5 ? "Buy" : stock.change >= -5 ? "Hold" : stock.change >= -10 ? "Sell" : "Strong Sell" }}' +
                    '</div>' +
                    '<div class="recommendation-source">SatiricalStocks Analysis</div>' +
                  '</div>' +
                '</div>' +
              '</div>' +
              
              '<!-- Financials Tab -->' +
              '<div v-if="analysisTab === \'financials\'" class="tab-content">' +
                '<h3>Financial Overview</h3>' +
                '<div class="financial-metrics">' +
                  '<div class="metric-item">' +
                    '<div class="metric-name">P/E Ratio:</div>' +
                    '<div class="metric-value">{{ companyMetrics.pe }}</div>' +
                  '</div>' +
                  '<div class="metric-item">' +
                    '<div class="metric-name">Dividend Yield:</div>' +
                    '<div class="metric-value">{{ companyMetrics.dividendYield }}</div>' +
                  '</div>' +
                  '<div class="metric-item">' +
                    '<div class="metric-name">Market Cap:</div>' +
                    '<div class="metric-value">{{ companyMetrics.marketCap }}</div>' +
                  '</div>' +
                  '<div class="metric-item">' +
                    '<div class="metric-name">Revenue Growth YoY:</div>' +
                    '<div class="metric-value">{{ (Math.random() * 40 - 10).toFixed(1) }}%</div>' +
                  '</div>' +
                  '<div class="metric-item">' +
                    '<div class="metric-name">Profit Margin:</div>' +
                    '<div class="metric-value">{{ (Math.random() * 30).toFixed(1) }}%</div>' +
                  '</div>' +
                '</div>' +
                
                '<div class="satirical-financials">' +
                  '<h4>Satirical Financial Notes</h4>' +
                  '<ul class="notes-list">' +
                    '<li>Company maintains "creative accounting" practices</li>' +
                    '<li>CEO compensation is {{ (Math.random() * 500 + 200).toFixed(0) }}x average employee salary</li>' +
                    '<li>Tax avoidance strategies saved ${{ (Math.random() * 1000 + 100).toFixed(0) }}M last year</li>' +
                    '<li>{{ (Math.random() * 80 + 20).toFixed(0) }}% of assets held in offshore accounts</li>' +
                    '<li>Spends more on executive retreats than R&D</li>' +
                  '</ul>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</transition>' +
    '</div>'
};
