// StockChart component
const StockChart = {
  props: {
    stocks: Array
  },
  data() {
    return {
      selectedStock: null,
      chart: null
    };
  },
  mounted() {
    // Use first stock by default
    if (this.stocks && this.stocks.length > 0) {
      this.selectedStock = this.stocks[0];
      this.$nextTick(() => {
        this.createChart();
      });
    }
  },
  methods: {
    selectStock(stock) {
      this.selectedStock = stock;
      this.updateChart();
    },
    createChart() {
      try {
        const ctx = this.$refs.stockChart.getContext('2d');
        
        if (!ctx) {
          console.error("Could not get canvas context");
          return;
        }
        
        if (!this.selectedStock || !this.selectedStock.history) {
          console.error("No stock or history data available");
          return;
        }
        
        this.chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: Array(30).fill().map((_, i) => `Day ${30-i}`).reverse(),
            datasets: [{
              label: this.selectedStock.name,
              data: this.selectedStock.history,
              borderColor: '#4caf50',
              backgroundColor: 'rgba(76, 175, 80, 0.1)',
              borderWidth: 2,
              tension: 0.4
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    return '$' + context.raw.toFixed(2);
                  }
                }
              }
            },
            scales: {
              y: {
                ticks: {
                  callback: function(value) {
                    return '$' + value.toFixed(2);
                  }
                }
              }
            }
          }
        });
      } catch (err) {
        console.error("Error creating chart:", err);
      }
    },
    updateChart() {
      if (!this.chart || !this.selectedStock) return;
      
      try {
        this.chart.data.datasets[0].label = this.selectedStock.name;
        this.chart.data.datasets[0].data = this.selectedStock.history;
        this.chart.update();
      } catch (err) {
        console.error("Error updating chart:", err);
      }
    }
  },
  watch: {
    'stocks': {
      deep: true,
      handler() {
        if (this.selectedStock && this.chart) {
          this.updateChart();
        }
      }
    }
  },
  template: `
    <div class="stock-chart">
      <h2>Market Trends</h2>
      <div class="stock-selector">
        <select v-model="selectedStock" @change="updateChart">
          <option v-for="stock in stocks" :key="stock.id" :value="stock">
            {{ stock.name }} ({{ stock.symbol }})
          </option>
        </select>
      </div>
      <div class="chart-container">
        <canvas ref="stockChart"></canvas>
      </div>
    </div>
  `
};