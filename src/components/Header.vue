<template>
    <header class="bg-white z-50">
      <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div class="flex lg:flex-1">
          <a href="#" class="-m-1.5 p-1.5" @click="goHome">
            <span class="sr-only">Color palette generator</span>
            <img class="h-10 w-auto" src="@/assets/logo.png" alt="logo" />
          </a>
        </div>
        <div class="flex lg:hidden">
          <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>
      <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
        <div class="fixed inset-0 z-50" />
        <DialogPanel class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 ">
          <div class="flex items-center justify-between">
            <a href="#" class="-m-1.5 p-1.5" @click="goHome">
              <span class="sr-only">Color palette generator</span>
              <img class="h-8 w-auto" src="@/assets/logo.png" alt="logo" />
            </a>
            <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
              <span class="sr-only">Close menu</span>
              <XMarkIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
        </DialogPanel>
      </Dialog>
    </header>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import {
    Dialog,
    DialogPanel,
  } from '@headlessui/vue'
  import {
    Bars3Icon,
    XMarkIcon,
  } from '@heroicons/vue/24/outline'
 
  const mobileMenuOpen = ref(false)

  function goHome(event) {
  event.preventDefault();
  window.location.href = '/';
}

function goToFeatures(event) {
  event.preventDefault();
  window.location.href = '../Pages/Features.vue';
}

  </script>
