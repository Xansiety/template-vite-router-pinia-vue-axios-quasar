<script setup>
import { ref } from "vue"
import useAuth from "../composables/useAuth"
import { useQuasar } from "quasar"

const $q = useQuasar()
const { singInUser, checkLoadingSession } = useAuth()

const loadingSession = checkLoadingSession()

const userForm = ref({
  email: "ferando543@outlook.com",
  password: "abc123",
})

const onSubmit = async () => {
  const data = await singInUser(userForm.value)

  if (data) {
    $q.notify({
      type: "negative",
      message: data.data,
      position: "top",
    })
  }
}

const onReset = () => {
  userForm.value = {
    email: "",
    password: "",
  }
}

const isValidEmail = (val) => {
  const emailPattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
  return emailPattern.test(val) || "El correo no parece ser válido"
}
</script>

<template>
  <q-page padding>
    <!-- <span class="text-h3">Forms</span> -->
    <q-separator spaced />
    <div class="row justify-center">
      <q-form
        @submit.prevent="onSubmit"
        @reset="onReset"
        class="q-gutter-xs col-xs-12 col-sm-12 col-md-4 q-pt-xl"
      >
        <q-input
          filled
          v-model="userForm.email"
          label="Correo electrónico"
          type="email"
          hint="nombre y usuario"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Por favor escribe algo!!',
            isValidEmail,
          ]"
        />

        <q-input
          filled
          type="password"
          v-model="userForm.password"
          label="Contraseña"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Por favor escribe algo!!',
          ]"
        />

        <div class="row justify-end">
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
          <q-btn
            :loading="loadingSession"
            :disable="loadingSession"
            type="submit"
            color="primary"
            unelevated
            style="width: 150px"
          >
            Ingresar
            <template v-slot:loading>
              <q-spinner-hourglass class="on-left" />
            </template>
          </q-btn>
        </div>
      </q-form>
    </div>
  </q-page>
</template>
