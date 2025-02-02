<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { ITicker } from "@/types";
import type { Ref } from "vue";

const tickers: Ref<ITicker[] | null> = ref(null)

const getCoinsData = async () => {
  try {
    const response = await fetch('https://api.ok-ex.io/oapi/v1/market/tickers');
    if (!response.ok) {
      throw new Error('There is a problem with network');
    }
    const jsonResponse = await response.json();
    tickers.value = jsonResponse.tickers.map((item: ITicker) => {
      const difference = item.high_24h - item.low_24h
      const percentage = (difference / item.low_24h) * 100;
      return {
        ...item,
        difference_24: percentage.toFixed(2)
      }
    })
    console.log(tickers.value);

  } catch (error) {
    console.error('error while getting tickers', error);
  }
}

onMounted(getCoinsData)
</script>

<template>
  <main class="container">
    <div class="header-container">
      <span>قیمت</span>
      <span>تغییر 24 ساعته</span>
      <span>جفت</span>
    </div>
    <ul class="list">
      <li v-for="(ticker, i) in tickers" :key="i" class="list-item">
        <div dir="ltr">{{ ticker.last }} USDT</div>
        <div>
          <div class="badge" dir="ltr"
            :class="ticker.difference_24 > 1 ? 'bg-success text-success' : 'bg-error text-error'">
            {{ ticker.difference_24 }} %
          </div>
        </div>
        <div>{{ ticker.symbol }}</div>
      </li>
    </ul>
  </main>
</template>

<style scoped>
.container{
  width: clamp(300px, 100%, 600px);
  margin-inline: auto;
}
.header-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 10px;
  padding: 20px 10px;
}

.header-container span {
  font-weight: 300;
  color: #A7A29E;
}

.list .list-item {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-content: center;
  padding: 15px 10px;
  text-align: center;
  font-size: 15px;
}

.badge {
  padding: 6px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 60px;
  margin-inline: auto;
  font-size: 13px;
}
</style>