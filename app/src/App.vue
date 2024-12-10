<script setup lang="ts">
import DataCard from './components/DataCard.vue';
import { DppData } from './types/dpp-data';
import { reactive } from 'vue';
import generateDpp, { generateId } from './util/generate-dpp';

const dpps = reactive<DppData[]>([]);

const deleteDpp = (id: string) => {
    const index = dpps.findIndex(dpp => dpp.id === id);
    if (index !== -1) {
        dpps.splice(index, 1);
    }
};

const cloneDpp = (id: string) => {
    const dpp = dpps.find(dpp => dpp.id === id);
    if (dpp !== undefined) {
        dpps.push({ ...dpp, id: generateId(), origin: dpp.id });
    }
};

const addDpp = () => {
    const dpp = generateDpp();
    dpps.push(dpp);
};
</script>

<template>
    <div class="data-card-list">
        <DataCard v-for="dpp in dpps" :key="dpp.id" :data="dpp" @delete="deleteDpp(dpp.id)" @clone="cloneDpp(dpp.id)" />
    </div>
    <button class="add-button" @click="addDpp">Add</button>
</template>

<style>
.data-card-list {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.add-button {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    height: 3rem;
    border-radius: 8px;
    font-size: 1.5rem;
    background-color: var(--color-primary);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
}
</style>
