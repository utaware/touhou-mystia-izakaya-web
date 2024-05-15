<script setup lang="ts">
import { ref, onMounted } from 'vue'

import CustomAudio from '@/components/common/customAudio/index.vue'

import { MusicNote2Play20Filled } from '@vicons/fluent'

import { getAssetsUrl } from '@/utils/pub-use'

import { animate } from './animate'

const url = getAssetsUrl('media/welcome.mp3')

const visible = ref(false)

onMounted(() => {
  animate()
})

const handleToggleVisible = () => {
  visible.value = !visible.value
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
</template>

<style scoped lang="scss">
@import url('./styles/animate.scss');
@import url('./styles/audio.scss');
</style>