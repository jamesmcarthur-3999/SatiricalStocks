// Upgrades component
var Upgrades = {
  props: ['upgrades', 'playerCash'],
  methods: {
    buyUpgrade: function(upgrade) {
      this.$emit('buy-upgrade', upgrade);
    }
  },
  template: `
    <div class="upgrade-shop">
      <h2 class="upgrade-title">Ways to "Optimize" Your Wealth</h2>
      <ul class="upgrade-list">
        <li v-for="upgrade in upgrades" :key="upgrade.id" class="upgrade-item">
          <div class="upgrade-info">
            <div class="upgrade-name">{{ upgrade.name }}</div>
            <div class="upgrade-description">{{ upgrade.description }}</div>
            <div class="upgrade-effect">{{ upgrade.effect }}</div>
          </div>
          <div class="upgrade-purchase">
            <span class="upgrade-price">\${{ upgrade.price.toLocaleString() }}</span>
            <button 
              class="btn" 
              @click="buyUpgrade(upgrade)" 
              :disabled="playerCash < upgrade.price || upgrade.owned"
            >
              {{ upgrade.owned ? 'Owned' : 'Buy' }}
            </button>
          </div>
        </li>
      </ul>
    </div>
  `
};