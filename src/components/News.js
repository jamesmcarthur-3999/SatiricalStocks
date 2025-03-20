// News component
var News = {
  props: ['newsItems'],
  template: `
    <div class="news-section">
      <h2 class="news-title">Breaking News</h2>
      <ul class="news-list">
        <li v-for="(item, index) in newsItems" :key="index" class="news-item">
          <div class="news-headline">{{ item.headline }}</div>
          <div class="news-effect">Effect: {{ item.effect }}</div>
        </li>
      </ul>
    </div>
  `
};