<template>
  <div>
    <v-dialog
      v-model="newStepDialog"
      @update:model-value="startValues()"
      :width="width"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          :icon="iconButton"
          rounded
          :variant="variantButton"
          v-bind="props"
          :size="sizeButton"
        >
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          class="my-1 mx-1 d-flex justify-space-between align-center"
        >
          <span v-if="edit" class="mx-1">Alterar Tarefa</span>
          <span v-else class="mx-1">Nova Tarefa</span>
          <v-btn
            class="mx-1"
            icon="mdi-close"
            variant="text"
            rounded
            @click="dialog = false"
          >
          </v-btn>
        </v-card-title>
        <v-divider class="mb-2"></v-divider>

        <v-text-field
          class="mx-4 my-1"
          color="primary"
          clearable
          label="Nome"
          v-model="newStep.description"
        ></v-text-field>

        <v-card-actions class="d-flex justify-center align-center mb-2">
          <v-btn
            v-if="edit"
            rounded
            color="primary"
            variant="tonal"
            @click="emitEditStep"
          >
            Confirmar
          </v-btn>
          <v-btn
            v-else
            rounded
            color="primary"
            variant="tonal"
            @click="emitAddStep"
          >
            Adicionar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
export default {
  name: "newStep",
  props: {
    listId: {
      type: Number,
      default: 0,
    },
    openModal: {
      type: Boolean,
      default: false,
    },

    iconButton: {
      type: String,
      default: "$vuetify",
    },
    width: {
      type: String,
      default: "",
    },
    edit: {
      type: Boolean,
      default: false,
    },
    sizeButton: {
      type: String,
      default: "small",
    },
    variantButton: {
      type: String,
      default: "tonal",
    },
    editOptions: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const newStepDialog = ref(false);
    const newStep = ref({
      description: "",
      listId: props.listId,
    });
    onMounted(() => {
      if (props.edit) {
        newStep.value = props.editOptions;
      }
    });
    function startValues() {
      if (props.edit == false) {
        newStep.value.description = "";
      }
    }

    const emitEditStep = () => {
      emit("edit", newStep.value);
      newStepDialog.value = false;
    };
    const emitAddStep = () => {
      emit("add", newStep.value);
      newStepDialog.value = false;
    };

    return {
      newStep,
      startValues,
      emitAddStep,
      emitEditStep,
      newStepDialog,
    };
  },
};
</script>
