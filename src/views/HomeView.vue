<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Ref } from "vue";

interface ITicker {
  best_ask: string;
  best_bid: number;
  high_24h: number
  last: string;
  low_24h: number;
  open_24h: string;
  symbol: string;
  ts: number,
  vol_24h: number;
  vol_24h_pair: number
}

const tickers: Ref<ITicker[] | null> = ref(null)

const getCoinsData = async () => {
  try {
    const response = await fetch('https://api.ok-ex.io/oapi/v1/market/tickers');
    if (!response.ok) {
      throw new Error('There is a problem with network');
    }
    const jsonResponse = await response.json();
    tickers.value = jsonResponse.tickers
  } catch (error) {
    console.error('error while getting tickers', error);
  }
}

onMounted(getCoinsData)
</script>

<template>
  <main>
    <ul class="list" v-for="(ticker, i) in tickers" :key="i">
      <li class="list-item"></li>
    </ul>
  </main>
</template>
