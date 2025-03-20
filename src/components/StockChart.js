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
    this.selectedStock = this.stocks[0];
    this.createChart();
  },
  methods: {
    selectStock(stock) {
      this.selectedStock = stock;
      this.updateChart();
    },
    createChart() {
      const ctx = this.$refs.stockChart.getContext('2d');
      
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
                  return `$${context.raw.toFixed(2)}`;
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
    },
    updateChart() {
      if (!this.chart) return;
      
      this.chart.data.datasets[0].label = this.selectedStock.name;
      this.chart.data.datasets[0].data = this.selectedStock.history;
      this.chart.update();
    }
  },
  watch: {
    'stocks': {
      deep: true,
      handler() {
        if (this.selectedStock) {
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