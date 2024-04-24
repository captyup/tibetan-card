<template>
  <v-app>
    <v-app-bar :elevation="2">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>藏文字卡</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer
        v-model="drawer"
        temporary
      >
      <v-list>
        <v-list-item  v-for="item in items" :key="item.value" :value="item.value">
          <template v-slot:prepend="{ isActive }">
          <v-list-item-action start>
            <v-checkbox-btn :model-value="isActive" :value="item.value" v-model="app.selected" :multiple="true" ></v-checkbox-btn>
          </v-list-item-action>
        </template>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
      </v-navigation-drawer>
    <v-main>
      <Letter30 />
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import { useAppStore } from '@/stores/app';
import { ref } from 'vue';
const app = useAppStore()
const drawer = ref(false)
const items = [        {
          title: '三十字母',
          value: 'cardset-01',
        },
        {
          title: '四元音',
          value: 'cardset-02',
        },]
</script>
