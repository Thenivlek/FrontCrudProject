<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
        md="4"
        v-for="checklist in checklists"
        :key="checklist.id"
      >
        <v-card class="my-4 py-6 px-8">
          <v-card-title class="text-h5"
            >{{ checklist.title }}
            <TransitionGroup name="list" tag="v-icon">
              <v-icon
                transition="scroll-x-transition"
                class="float-end"
                color="red"
                v-if="checklist.completed == false"
                end
                icon="mdi-close-circle-outline"
              ></v-icon>
              <v-icon
                class="float-end"
                color="primary"
                v-if="checklist.completed == null"
                end
                icon="mdi-minus-circle-outline"
              ></v-icon>
              <v-icon
                class="float-end"
                color="green"
                v-if="checklist.completed == true"
                end
                icon="mdi-checkbox-marked-circle"
              ></v-icon> </TransitionGroup
          ></v-card-title>
          <v-card-subtitle class="pb-1 text-subtitle-1">{{
            checklist.subtitle
          }}</v-card-subtitle>
          <v-divider class="mb-2"></v-divider>

          <v-checkbox
            class="pl-2 pb-0 mb-0"
            v-model="item.completed"
            v-for="item in checklist.items"
            :key="item.id"
            density="compact"
            color="primary"
          >
            <template v-slot:label>
              <div class="pl-1 text-body-1">{{ item.description }}</div>
            </template>
          </v-checkbox>

          <v-card-actions class="pa-0 ma-0">
            <v-btn
              color="primary"
              @click="completeChecklist(checklist)"
              :disabled="checklist.completed"
            >
              Concluir
            </v-btn>
            <!--

            -->
            <v-btn color="primary"> Adicionar </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, watch } from "vue";
export default {
  setup() {
    const checklists = ref([
      {
        id: 0,
        title: "Lavar Louça",
        subtitle: "Última atualização: Hoje",
        completed: false,
        items: [
          { id: 1, description: "Pratos", completed: false },
          { id: 2, description: "Talheres", completed: false },
          // ... adicione mais itens aqui
        ],
      },
    ]);

    watch(checklists.value, (newChecklists) => {
      newChecklists.forEach((checklist) => {
        const completedItems = checklist.items.filter((item) => item.completed);
        const totalItems = checklist.items.length;

        if (completedItems.length === 0) {
          checklist.completed = false;
        } else if (completedItems.length === totalItems) {
          checklist.completed = true;
        } else {
          checklist.completed = null;
        }
      });
    });

    function completeChecklist(checklist) {
      checklist.completed = true;
      checklist.items.forEach((element) => {
        element.completed = true;
      });
    }

    return {
      completeChecklist,
      checklists,
    };
  },
};
</script>
