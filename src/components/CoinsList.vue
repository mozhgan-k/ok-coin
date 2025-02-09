<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import type { ILiveData, ITicker } from "@/types";
import type { Ref } from "vue";

const allowedCoins = [
  "SOL-USDT", "BTC-USDT", "ETH-USDT", "OP-USDT", "AVAX-USDT",
  "DOT-USDT", "XRP-USDT", "ARB-USDT", "NEAR-USDT", "MATIC-USDT"
];

const getCoinsData = async () => {
  try {
    const response = await fetch('https://api.ok-ex.io/oapi/v1/market/tickers');
    if (!response.ok) {
      console.error('There is a problem with the network');
      return;
    }
    const jsonResponse = await response.json();
    
    const processedData = jsonResponse.tickers.filter((item: ITicker) => allowedCoins.includes(item.instId))
      .map((item: ITicker) => {
        const difference = item.high_24h - item.low_24h;
        const percentage = (difference / item.low_24h) * 100;
        return {
          symbol: item.instId,
          difference_24: percentage.toFixed(2),
          formattedPrice: parseFloat(item.last).toLocaleString() + " USDT"
        };
      });

    liveData.value = processedData;

  } catch (error) {
    console.error('Error while getting tickers', error);
  }
};


const socket: Ref<WebSocket | null> = ref(null)
const liveData:Ref<ITicker[]> = ref([])
const connectWebSocket = () => {
  socket.value = new WebSocket("wss://wsg.ok-ex.io/ws")

  socket.value.addEventListener('open', (event) => {
    console.log('WebSocket connection opened:', event);

    // Subscribe to allowed coins
    const subscribeMessage = JSON.stringify({
      args: allowedCoins.map((instId) => ({ channel: "tickers", instId })),
      op: "subscribe"
    });
    socket.value?.send(subscribeMessage);
  });

  // Listen for messages
  socket.value.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    const updatedData = data.data.map((item: ILiveData) => {
      const difference = parseFloat(item.high24h) - parseFloat(item.low24h);
      const percentage = (difference / parseFloat(item.low24h)) * 100;
      let symbol = ""
      if (String(item.instId).includes("-")) {
        symbol = item.instId.split("-")[0];
      } else {
        symbol = item.instId
      }
      return {
        symbol: symbol,
        difference_24: percentage.toFixed(2),
        formattedPrice: parseFloat(item.last).toLocaleString() + " USDT"
      };
    });

    // Update the liveData array with the new data, only modifying the fields that changed
    updatedData.forEach((newItem) => {
      const existingItemIndex = liveData.value.findIndex((item) => item.symbol === newItem.symbol);

      if (existingItemIndex !== -1) {
        // Update the specific fields of the existing item
        const existingItem = liveData.value[existingItemIndex];
        existingItem.difference_24 = newItem.difference_24;
        existingItem.formattedPrice = newItem.formattedPrice;
        liveData.value = [...liveData.value]
      } else {
        // If the item doesn't exist, push new item
        liveData.value.push(newItem);
      }
    });
  });

  // Handle errors
  socket.value.addEventListener('error', (event) => {
    console.error('WebSocket error:', event);
  });

  // Connection closed
  socket.value.addEventListener('close', (event) => {
    console.log('WebSocket connection closed:', event);

    // Attempt to reconnect after 5 seconds
    setTimeout(() => {
      connectWebSocket();
    }, 5000);
  });

}

onMounted(() => {
  getCoinsData()
  connectWebSocket()
})

onUnmounted(() => {
  // Close the WebSocket connection when the component is unmounting
  if (socket.value) {
    socket.value.close();
  }
})
</script>

<template>
  <main class="container">
    <div class="header-container">
      <span>قیمت</span>
      <span>تغییر 24 ساعته</span>
      <span>جفت</span>
    </div>
    <ul v-if="liveData.length" class="list">
      <li v-for="(ticker, i) in liveData" :key="i" class="list-item">
        <div dir="ltr">{{ ticker.formattedPrice }}</div>
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
  font-size: 14px;
}

.badge {
  padding: 6px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 60px;
  margin-inline: auto;
  font-size: 12px;
}
</style>
