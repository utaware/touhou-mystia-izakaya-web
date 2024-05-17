<script setup lang="ts">
import { ref, onMounted } from 'vue'

import CustomAudio from '@/components/common/customAudio/index.vue'

import { MusicNote2Play20Filled, PulseSquare24Filled } from '@vicons/fluent'

import { getAssetsUrl } from '@/utils/pub-use'

import { Firefly } from './animate/firefly'

const url = getAssetsUrl('media/welcome.mp3')

const visible = ref(false)

let animate: Firefly | null = null

onMounted(() => {
  animate = new Firefly()
})

const handleToggleVisible = () => {
  visible.value = !visible.value
}

const handleToggleAnimate = () => {
  animate && animate.toggle()
}
</script>

<template>
  <div class="home-page">
    <!-- particles -->
    <div class="particles">
      <div class="firefly" id="firefly"></div>
    </div>
    <!-- audio -->
    <div class="custom-audio">
      <Transition name="fade">
        <custom-audio v-show="visible" :src="url" loop />
      </Transition>
      <div class="icon-group">
        <n-icon-wrapper
          class="icon-wrapper"
          :size="36"
          :border-radius="10"
        >
          <n-icon size="28" @click="handleToggleAnimate">
            <PulseSquare24Filled />
          </n-icon>
        </n-icon-wrapper>
        <n-icon-wrapper
          class="icon-wrapper"
          :size="36"
          :border-radius="10"
        >
          <n-icon size="28" @click="handleToggleVisible">
            <MusicNote2Play20Filled />
          </n-icon>
        </n-icon-wrapper>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url('./styles/animate.scss');
@import url('./styles/audio.scss');
</style>