<script setup lang="ts">
import DataCard from "./components/DataCard.vue";
import EditCard from "./components/EditCard.vue";
import { DppData, DppUpdate } from "./types/dpp-data";
import { reactive, ref } from "vue";
import generateDpp, { generateId } from "./util/generate-dpp";
import { cloneDeep, merge } from "lodash";

const dpps = reactive<DppData[]>([]);
const editModalOpen = ref(false);
const editModalDpp = ref<DppData | null>(null);
const inheritance = ref(false);

const deleteDpp = (id: string) => {
  const dpp = dpps.find((dpp) => dpp.id === id);
  if (!dpp) return;

  const newOrigin = dpp.origin;
  const index = dpps.findIndex((dpp) => dpp.id === id);
  dpps.splice(index, 1);

  const children = dpps.filter((item) => item.origin === id);
  for (const child of children) {
    child.origin = newOrigin;
  }
};

const cloneDpp = (id: string) => {
  const dpp = dpps.find((dpp) => dpp.id === id);
  if (dpp === undefined) return;
  dpps.push({ ...cloneDeep(dpp), id: generateId(), origin: dpp.id });
};

const editDpp = (id: string) => {
  const dpp = dpps.find((dpp) => dpp.id === id);
  if (dpp !== undefined) {
    editModalDpp.value = dpp;
    editModalOpen.value = true;
  }
};

const updateDpp = (id: string, updateData: DppUpdate) => {
  const dpp = dpps.find((dpp) => dpp.id === id);
  if (dpp === undefined) return;

  merge(dpp, updateData);

  if (inheritance.value) {
    const children = dpps.filter((item) => item.origin === id);
    for (const child of children) {
      updateDpp(child.id, updateData);
    }
  }

  editModalOpen.value = false;
};

const addDpp = () => {
  const dpp = generateDpp();
  dpps.push(dpp);
};
</script>

<template>
  <div class="data-card-list">
    <DataCard
      v-for="dpp in dpps"
      :key="dpp.id"
      :data="dpp"
      @edit="editDpp(dpp.id)"
      @delete="deleteDpp(dpp.id)"
      @clone="cloneDpp(dpp.id)"
    />
  </div>
  <EditCard
    v-model:open="editModalOpen"
    :initial-data="editModalDpp"
    @submit="
      (updateData) => editModalDpp && updateDpp(editModalDpp.id, updateData)
    "
  />
  <div class="float-buttons">
    <button
      class="float-button"
      :style="{ backgroundColor: inheritance ? 'green' : 'red' }"
      @click="inheritance = !inheritance"
    >
      Inheritance {{ inheritance ? "on" : "off" }}
    </button>
    <button class="float-button" @click="addDpp">Add</button>
  </div>
</template>

<style>
.data-card-list {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.float-buttons {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  gap: 1rem;
}

.float-button {
  height: 3rem;
  border-radius: 8px;
  font-size: 1.5rem;
  background-color: var(--color-primary);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
</style>
