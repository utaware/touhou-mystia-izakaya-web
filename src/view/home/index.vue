<script setup lang="ts">

</script>

<template>
  <div class="home-page">
    <!-- particles -->
    <div class="particles">
      <div class="firefly" id="firefly"></div>
    </div>
    <!-- music -->
    <audio id="music" autoplay controls class="play">
      <source src="@/assets/media/welcome.mp3" type="audio/mpeg" />
    </audio>
  </div>
</template>

<style scoped lang="scss">
.home-page {
  .particles {
    position: relative;
    width: 100%;
    height: calc(100vh - 54px);
    background-image: url('@/assets/bg/dream.png');
    background-size: cover;
    background-position: center;
    .firefly {
      position: absolute;
      left: 20px;
      top: 20px;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: radial-gradient(rgba(255, 252, 0, 0.75), rgba(255, 255, 235, 0.05), rgba(255, 255, 255, 0));
    }
  }
  .play {
    position: absolute;
    right: 48px;
    bottom: 48px;
  }
}
</style>