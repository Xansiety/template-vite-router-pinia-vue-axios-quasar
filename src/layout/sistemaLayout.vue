<script setup>
import { ref } from "vue"
import useAuth from "../composables/useAuth"
import { useUserStore } from "../store/user"
const storeUser = useUserStore()
const { checkLoadingSession, logout, currentUser } = useAuth()
const loadingSession = checkLoadingSession()
const leftDrawerOpen = ref(false)
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<template>
  <div v-if="loadingSession">Cargando datos....</div>
  <q-layout view="lHh Lpr lFf" class="bg-white" v-else>
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
        />
        <q-toolbar-title> Quasar App </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-2"
      :width="200"
      :breakpoint="400"
    >
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item clickable v-ripple tag="a" :to="{ name: 'home' }">
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>
            <q-item-section> Home </q-item-section>
          </q-item>
        </q-list>

        <q-list padding>
          <q-expansion-item
            group="somegroup"
            icon="explore"
            label="Catalogs"
            default-opened
            header-class="text-primary"
          >
            <q-item clickable v-ripple tag="a" :to="{ name: 'catalog-1' }">
              <q-item-section avatar>
                <q-icon name="inbox" />
              </q-item-section>
              <q-item-section> Sub-menu </q-item-section>
            </q-item>
          </q-expansion-item>

          <q-separator />

          <q-expansion-item
            group="somegroup"
            icon="perm_identity"
            label="Second"
            header-class="text-teal"
          >
            <q-card>
              <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex
                numquam, dolorum officiis modi facere maiores architecto
                suscipit iste eveniet doloribus ullam aliquid.
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-separator />
        </q-list>

        <q-list padding>
          <q-item
            clickable
            v-ripple
            tag="a"
            @click="logout"
            class="bg-red text-white"
          >
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>
            <q-item-section> SALIR </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">
            {{ storeUser.userData?.userName }}
          </div>
          <div>{{ storeUser.userData?.userName }}</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container v-if="!loadingSession">
      <router-view />
    </q-page-container>
  </q-layout>
</template>
