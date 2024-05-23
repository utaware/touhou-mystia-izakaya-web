<script setup lang="ts">
import { ref, computed, reactive } from 'vue'

import slider from './slider.vue'

import { throttle } from 'lodash'

import {
  ArrowRepeatAll24Filled,
  ArrowRepeatAllOff24Filled,
  Play48Filled,
  Pause48Filled,
  Speaker220Filled,
  SpeakerOff20Filled,
} from '@vicons/fluent'

import { getComputedDuration, getFixedNum } from './utils/index.ts'

const props = withDefaults(defineProps<{
  src: string;
  loop: boolean;
}>(), {
  loop: false,
})

const audioEl = ref<HTMLAudioElement | null>(null)

const iconColor = 'rgba(0, 0, 0, 0.54)'
const iconSize = 24

const audio = reactive({
  volume: 1,
  currentTime: 0,
  totalTime: 0,
  sync: true,
  enableSyncTime: true,
  loop: props.loop,
  isPlay: false,
  isQuiet: false,
})

const progress = computed({
  get () {
    const { currentTime, totalTime } = audio
    return getFixedNum(currentTime / totalTime * 100)
  },
  set (value) {
    if (!audioEl.value) return
    const target = audioEl.value
    const current = getFixedNum(value / 100 * audio.totalTime)
    target.currentTime = current
    audio.currentTime = current
  }
})

const volume = computed({
  get () {
    return audio.volume
  },
  set (value) {
    if (!audioEl.value) return
    audioEl.value.volume = value
    audio.volume = value
  }
})

const handleDurationChange = (e: Event) => {
  const { duration } = <HTMLAudioElement>(e.target)
  audio.totalTime = duration
}

const handleTimeupdate = throttle((e: Event) => {
  if (!e.target || !audio.enableSyncTime) return
  const { currentTime } = <HTMLAudioElement>(e.target)
  audio.currentTime = currentTime
}, 500)

const onAudioPlay = () => {
  audio.isPlay = true
}

const onAudioPause = () => {
  audio.isPlay = false
}

const handleTogglePlay = () => {
  if (!audioEl.value) return
  if (audio.isPlay) {
    audioEl.value.pause()
  } else {
    audioEl.value.play()
  }
}

const handleToggleLoop = () => {
  audio.loop = !audio.loop
}

const toggleSyncTime = (value: boolean) => {
  audio.enableSyncTime = value
}

const handleToggleVolume = () => {
  volume.value = Number(!volume.value)
}
</script>

<template>
  <div class="audio">
    <!-- music -->
    <audio
      class="play"
      ref="audioEl"
      :loop="audio.loop"
      @durationchange="handleDurationChange"
      @timeupdate="handleTimeupdate"
      @play="onAudioPlay"
      @pause="onAudioPause"
    >
      <source :src="src" type="audio/mpeg" />
    </audio>
    <!-- progress -->
    <slider
      v-model:value="progress"
      :step="0.01"
      @Mousedown="toggleSyncTime(false)"
      @Mouseup="toggleSyncTime(true)"
    />
    <!-- panel -->
    <div class="panel">
      <!-- 进度 -->
      <span class="time">{{ getComputedDuration(audio.currentTime) }} / {{ getComputedDuration(audio.totalTime) }}</span>
      <!-- 播放/暂停 -->
      <n-icon :size="iconSize" :color="iconColor" @click="handleTogglePlay">
        <Pause48Filled v-if="audio.isPlay" />
        <Play48Filled v-else />
      </n-icon>
      <!-- 循环 -->
      <n-icon :size="iconSize" :color="iconColor" @click="handleToggleLoop">
        <ArrowRepeatAll24Filled v-if="audio.loop" />
        <ArrowRepeatAllOff24Filled v-else />
      </n-icon>
      <!-- 音量 -->
      <n-icon :size="iconSize" :color="iconColor" @click="handleToggleVolume">
        <Speaker220Filled v-if="audio.volume" />
        <SpeakerOff20Filled v-else />
      </n-icon>
      <slider v-model:value="volume" :max="1" :step="0.01" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.audio {
  padding: 16px;
  width: 280px;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(40px);
  .panel {
    margin-top: 12px;
    display: grid;
    column-gap: 6px;
    align-items: center;
    grid-template-columns: 80px repeat(3, 28px) auto;
    .time {
      opacity: 0.38;
      font-size: 12px;
      line-height: 1.5;
      letter-spacing: 0.5px;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    }
  }
}
</style>