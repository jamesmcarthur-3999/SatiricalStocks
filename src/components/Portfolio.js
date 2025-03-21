// Portfolio component
var Portfolio = {
  props: ['player', 'stocks', 'netWorth'],
  data: function() {
    return {
      selectedQuantities: {},
      error: null
    };
  },
  methods: {
    getStockQuantity: function(stockId) {
      return this.selectedQuantities[stockId] || 1;
    },
    updateQuantity: function(stockId, quantity) {
      // Use Vue.set for reactivity
      Vue.set(this.selectedQuantities, stockId, quantity);
      this.error = null;
    },
    setQuantityError: function(error) {
      this.error = error;
    },
    buyStock: function(stock) {
      const quantity = this.getStockQuantity(stock.id);
      this.$emit('buy-stock', stock, quantity);
    },
    sellStock: function(stock) {
      const quantity = this.getStockQuantity(stock.id);
      // Make sure we don't try to sell more than we own
      const sellQuantity = Math.min(quantity, stock.owned);
      this.$emit('sell-stock', stock, sellQuantity);
    },
    getMaxBuyQuantity: function(stock) {
      // Calculate how many shares we can afford
      return Math.floor(this.player.cash / stock.price);
    }
  },
  template: 
    '<div class="portfolio">' +
      '<h2>Portfolio</h2>' +
      '<div class="balance">Cash: ${{ player.cash.toLocaleString() }}</div>' +
      '<div class="net-worth">Net Worth: ${{ netWorth.toLocaleString() }}</div>' +
      '<div v-if="error" class="error-message">{{ error }}</div>' +
      
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
          
          '<trade-quantity-selector ' +
            ':value="getStockQuantity(stock.id)" ' +
            ':max-quantity="stock.owned > 0 ? stock.owned : getMaxBuyQuantity(stock)" ' +
            '@update="updateQuantity(stock.id, $event)" ' +
            '@error="setQuantityError($event)"' +
          '></trade-quantity-selector>' +
          
          '<div class="stock-actions">' +
            '<button class="btn btn-buy" @click="buyStock(stock)" ' +
              ':disabled="player.cash < (stock.price * getStockQuantity(stock.id))">' +
              'Buy {{ getStockQuantity(stock.id) > 1 ? getStockQuantity(stock.id) : "" }}' +
            '</button>' +
            '<button class="btn btn-sell" @click="sellStock(stock)" ' +
              ':disabled="stock.owned <= 0">' +
              'Sell {{ getStockQuantity(stock.id) > 1 ? getStockQuantity(stock.id) : "" }}' +
            '</button>' +
          '</div>' +
          '<div class="transaction-preview" v-if="getStockQuantity(stock.id) > 1">' +
            '<div>Cost: ${{ (stock.price * getStockQuantity(stock.id)).toLocaleString() }}</div>' +
          '</div>' +
        '</li>' +
      '</ul>' +
    '</div>'
};
