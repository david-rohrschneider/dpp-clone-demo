<script setup lang="ts">
import { DppData } from "../types/dpp-data";

const { data } = defineProps<{ data: DppData }>();
defineEmits(["edit", "delete", "clone"]);
</script>

<template>
  <div class="data-card">
    <div class="data-card-header">
      <h2>{{ data.id }}</h2>
      <h5 v-if="data.origin !== null">{{ `Cloned from: ${data.origin}` }}</h5>
      <h5 v-else style="font-style: italic">ROOT</h5>
    </div>
    <div class="divider" />
    <h3>General Data</h3>
    <table class="data-table">
      <tr
        v-for="([key, value], i) in Object.entries(data.generalData)"
        :key="i"
      >
        <td align="left">{{ key }}</td>
        <td align="left">{{ value }}</td>
      </tr>
    </table>
    <div class="divider" />
    <h3>Environmental Data</h3>
    <table class="data-table">
      <tr
        v-for="([key, value], i) in Object.entries(data.environmentalData)"
        :key="i"
      >
        <td align="left">{{ key }}</td>
        <td align="left">{{ `${value.value} ${value.unit}` }}</td>
      </tr>
    </table>
    <div class="button-group">
      <button @click="$emit('edit')">Edit</button>
      <button @click="$emit('clone')">Clone</button>
      <button @click="$emit('delete')">Delete</button>
    </div>
  </div>
</template>

<style>
.data-card {
  display: flex;
  flex-direction: column;
  align-items: start;
  border-radius: 5px;
  padding: 2rem;
  width: 20rem;
  background-color: #f0f0f0;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.8);
}

.data-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.data-table {
  width: 100%;
}

.data-table td {
  width: 50%;
}
</style>
