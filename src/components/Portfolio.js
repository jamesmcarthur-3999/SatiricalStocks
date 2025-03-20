// Portfolio component
var Portfolio = {
  props: ['player', 'stocks', 'netWorth'],
  methods: {
    buyStock: function(stock) {
      this.$emit('buy-stock', stock);
    },
    sellStock: function(stock) {
      this.$emit('sell-stock', stock);
    }
  },
  template: 
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
    '</div>'
};