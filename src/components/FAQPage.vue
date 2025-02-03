<script setup lang="ts">
import {ref, type Ref} from "vue";
import type {IFAQ} from "../types/faq"
import ExpansionPanel from "./ExpansionPanel.vue";

const FAQs: Ref<IFAQ[] | null> = ref(null)

try {
  const response = await fetch(' https://azapi.ok-ex.io/server/api/support/faq');
  if (!response.ok) {
    console.log('There is a problem with network')
  }
  const jsonResponse = await response.json();
  FAQs.value = jsonResponse.data

} catch (error) {
  console.error('error while getting FAQs', error);
}

</script>

<template>
  <main class="faq-container">
    <template v-for="faq in FAQs" :key="faq._id">
      <div class="faq-title-container">
        <img src="/okex.svg" alt="okex-faq">
        <h2>{{ faq.category }}</h2>
      </div>
      <div v-for="child in faq.children" :key="child._id" class="faq-parent-container">
        <h3>{{ child.category }}</h3>
        <div class="faq-child-container">
          <template v-for="row in child.rows" :key="row._id">
            <ExpansionPanel :title="row.question" :default-open="false">
              <p>{{ row.answer }}</p>
            </ExpansionPanel>
          </template>
        </div>
      </div>
    </template>

  </main>
</template>

<style scoped>
.faq-title-container {
  display: flex;
  align-items: center;
  margin: 20px 0;
}

.faq-title-container img {
  width: 32px;
  height: 32px;
}

.faq-title-container h2 {
  line-height: 2.5rem;
  font-weight: 800;
  margin-right: 10px;
}

.faq-parent-container h3 {
  line-height: 2rem;
  font-weight: 600;
}

.faq-container {
  width: clamp(300px, 100%, 1024px);
  margin-inline: auto;
  padding: 40px 0;
}

.faq-child-container {
  margin-top: 20px;
}
</style>
