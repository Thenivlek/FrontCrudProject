<template>
  <div>
    <v-dialog
      v-model="newTaskDialog"
      @update:model-value="startValues()"
      :width="width"
    >
      <template v-slot:activator="{ props }">
        <div :style="styleButton" class="d-flex justify-center align-center">
          <v-btn
            :icon="icon"
            color="primary"
            elevation="4"
            density="default"
            v-bind="props"
          ></v-btn>
        </div>
      </template>
      <v-card>
        <v-card-title
          class="my-1 mx-1 d-flex justify-space-between align-center"
        >
          <span class="mx-1" v-if="edit"> Alteração da Lista de Tarefa</span>
          <span class="mx-1" v-else>Nova Lista de Tarefas</span>
          <v-btn
            class="mx-1"
            icon="mdi-close"
            variant="text"
            rounded
            @click="newTaskDialog = false"
          >
          </v-btn>
        </v-card-title>
        <v-divider class="mb-2"></v-divider>

        <v-text-field
          class="mx-4 my-1"
          color="primary"
          clearable
          label="Nome"
          v-model="newTask.title"
        ></v-text-field>
        <v-text-field
          class="mx-4 my-1"
          color="primary"
          clearable
          label="Subtítulo"
          v-model="newTask.subtitle"
        ></v-text-field>

        <v-card-actions class="d-flex justify-center align-center mb-2">
          <v-btn
            v-if="edit"
            rounded
            color="primary"
            variant="tonal"
            @click="emitConfirmTask"
            >Confirmar</v-btn
          >
          <v-btn
            v-else
            rounded
            color="primary"
            variant="tonal"
            @click="emitAddTask"
            >Adicionar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
export default {
  name: "newTask",
  props: {
    width: {
      type: String,
      default: "",
    },
    edit: {
      type: Boolean,
      default: false,
    },
    editOptions: {
      type: Object,
      default: () => {},
    },
    icon: {
      type: String,
      default: "mdi-plus",
    },
    styleButton: {
      type: String,
      default: "min-height: 400px",
    },
    sizeButton: {
      type: String,
      default: "",
    },
    variantButton: {
      type: String,
      default: "tonal",
    },
  },
  setup(props, { emit }) {
    const newTask = ref({
      title: "",
      id: 0,
      subtitle: "",
    });
    onMounted(() => {
      if (props.edit) {
        newTask.value = props.editOptions;
      }
    });
    const newTaskDialog = ref(false);
    const emitConfirmTask = () => {
      newTaskDialog.value = false;
      emit("editList", newTask.value);
    };
    const emitAddTask = () => {
      newTaskDialog.value = false;
      emit("addList", newTask.value);
    };
    function startValues() {
      if (props.edit == false) {
        newTask.value.title = "";
        newTask.value.subtitle = "";
      }
    }

    return {
      newTaskDialog,
      newTask,
      emitAddTask,
      startValues,
      emitConfirmTask,
    };
  },
};
</script>
