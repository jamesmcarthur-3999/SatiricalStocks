// Trade Quantity Selector component
var TradeQuantitySelector = {
  props: ['value', 'maxQuantity'],
  data: function() {
    return {
      customQuantity: "",
      presets: [1, 5, 10, 25, 100]
    };
  },
  methods: {
    selectPreset: function(quantity) {
      // If a max is provided, ensure we don't exceed it
      var actualQuantity = this.maxQuantity !== null ? 
        Math.min(quantity, this.maxQuantity) : quantity;
        
      this.$emit('update', actualQuantity);
      this.customQuantity = "";
    },
    setCustomQuantity: function() {
      var value = parseInt(this.customQuantity);
      if (!isNaN(value) && value > 0) {
        // If a max is provided, ensure we don't exceed it
        var actualQuantity = this.maxQuantity !== null ? 
          Math.min(value, this.maxQuantity) : value;
          
        this.$emit('update', actualQuantity);
        
        // If we capped the value, update the input
        if (this.maxQuantity !== null && value > this.maxQuantity) {
          this.customQuantity = this.maxQuantity.toString();
        }
      } else {
        this.$emit('error', "Please enter a valid quantity");
        this.customQuantity = "";
      }
    }
  },
  template: `
    <div class="trade-quantity-selector">
      <div class="quantity-label">Quantity: <strong>{{ value }}</strong></div>
      
      <div class="quantity-presets">
        <button 
          v-for="preset in presets" 
          :key="preset"
          class="preset-btn"
          :class="{ active: value === preset }"
          @click="selectPreset(preset)"
        >
          {{ preset }}
        </button>
        
        <div class="custom-quantity">
          <input 
            type="number" 
            v-model="customQuantity" 
            min="1"
            :max="maxQuantity"
            placeholder="Custom"
            @keyup.enter="setCustomQuantity"
          />
          <button 
            class="btn-apply" 
            @click="setCustomQuantity"
            :disabled="!customQuantity"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  `
};