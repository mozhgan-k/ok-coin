<script setup lang="ts">
import {ref, type Ref} from "vue";
import type {IFAQ} from "../types/faq"
import ExpansionPanel from "./ExpansionPanel.vue";
import ChevronLeft from "./Icons/ChevronLeft.vue"

const props = defineProps<{ faqs: { data: IFAQ[] } | null }>();
const FAQs: Ref<IFAQ[] | null> = ref(props.faqs || null);

</script>

<template>
  <main class="faq-container">
    <a href="/">
      <ChevronLeft width="13px" height="13px" style="margin-left: 10px; transform: rotate(180deg);"/>
      بازگشت
    </a>
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
  margin: 20px 0;
}
</style>
