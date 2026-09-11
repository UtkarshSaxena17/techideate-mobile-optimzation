<template>
  <div id="three-scene-root">
    <div id="preloader"></div>
    <canvas id="dat-canvas" data-engine="three.js r181dev webgpu" class="drag" width="1920" height="1080" style="width: 1920px; height: 1080px; outline: none; position: absolute; left: 0px; top: 0px; max-width: 100%; max-height: 100%; touch-action: none;"></canvas>
    <div id="app" data-v-app>
      <div data-v-0e4014e1 data-v-0f16fcf3 class="notification-wrapper" style="opacity: 0; display: none;">
        <div data-v-0e4014e1 class="notification">
          <div data-v-0e4014e1 class="image-container">
            <img data-v-0e4014e1 class="imgquest" src="/front/quest4.svg">
          </div>
          <div data-v-0e4014e1 class="content-container">
            <div data-v-0e4014e1 class="title-notification-container">
              <h1 data-v-0e4014e1 class="bold notification"></h1>
            </div>
            <h3 data-v-0e4014e1 class="regular"> ノティフィケーション </h3>
            <h2 data-v-0e4014e1 class="medium anime"></h2>
          </div>
        </div>
      </div>
      <div data-v-3f08f550 data-v-0f16fcf3 id="globalvue">
        <div data-v-3f08f550 class="fps">
          <span data-v-3f08f550 class="fps-text">Connected: 1, Engine: WebGL</span>
        </div>
        <div data-v-3f08f550 id="soundtoggle" class="sound-off">
          <div data-v-3f08f550 class="sound-bars">
            <div data-v-3f08f550 class="bar bar-1"></div>
            <div data-v-3f08f550 class="bar bar-2"></div>
            <div data-v-3f08f550 class="bar bar-3"></div>
            <div data-v-3f08f550 class="bar bar-4"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

let scriptEl = null

onMounted(() => {
  if (document.querySelector('script[src*="main-BAxw1krX"]')) return

  scriptEl = document.createElement('script')
  scriptEl.type = 'module'
  scriptEl.crossOrigin = ''
  scriptEl.src = '/assets/js/main-BAxw1krX.js?v=fixed'
  document.body.appendChild(scriptEl)
})

onUnmounted(() => {
  if (scriptEl && scriptEl.parentNode) {
    scriptEl.parentNode.removeChild(scriptEl)
  }
})
</script>
