<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col
          cols="12"
          md="4"
          v-for="checklist in checklists"
          :key="checklist.id"
        >
          <v-card class="my-4 py-6 px-8 rounded-lg">
            <v-card-title class="text-h4 d-flex justify-space-between">
              <span>{{ checklist.title }}</span>
              <div class="d-flex">
                <newTaskVue
                  class="mr-1"
                  width="30vw"
                  @editList="editTask"
                  :edit="true"
                  :editOptions="checklist"
                  :icon="'mdi-pencil'"
                  styleButton=""
                />
                <v-btn
                  icon="mdi-delete"
                  color="red"
                  class="ml-1"
                  variant="tonal"
                  @click="onDeleteList(checklist.id)"
                />
              </div>

              <!--
                <v-btn
                color="primary"
                icon="mdi-pencil"
                class="float-right"
                variant="text"
                @click="onEditList(checklist.id)"
              />
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
            >
              -->
            </v-card-title>
            <v-card-subtitle class="pb-1 text-subtitle-1">{{
              checklist.subtitle
            }}</v-card-subtitle>
            <v-divider class="mb-2"></v-divider>
            <div
              v-for="item in checklist.items"
              :key="item.id"
              class="d-flex align-center justify-center w-full h-full rounded-pill pa-2"
            >
              <v-checkbox
                class="pl-2 pb-0 mb-0"
                style="margin-bottom: -30px"
                v-model="item.completed"
                density="compact"
                color="primary"
              >
                <template v-slot:label>
                  <div class="pl-1 text-body-1">
                    <span>
                      {{ item.description }}
                    </span>
                  </div>
                </template>
              </v-checkbox>

              <newStep
                :listId="checklist.id"
                :edit="true"
                class="ml-2"
                @edit="onEditItem"
                iconButton="mdi-pencil"
                width="30vw"
                :editOptions="item"
                variantButton="outline"
              />
              <v-btn
                icon="mdi-delete"
                size="small"
                color="red"
                class="ml-1"
                variant="plain"
                @click="deleteItem(item.id)"
              />
            </div>

            <div class="d-flex justify-center mt-2">
              <newStep
                @add="onAddNewStep"
                :listId="checklist.id"
                class="ml-2"
                iconButton="mdi-plus"
                width="30vw"
              />
            </div>
            <v-divider class="my-5 mb-1"></v-divider>

            <v-card-actions class="pa-0 ma-0">
              <v-btn
                color="primary"
                @click="completeChecklist(checklist)"
                :disabled="checklist.completed"
                rounded
              >
                Concluir
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <newTaskVue
            width="30vw"
            :edit="editList"
            @addList="addList"
            :sizeButton="'x-large'"
          />
          <!--
<div
            style="min-height: 400px"
            class="d-flex justify-center my-4 py-6 px-8 rounded-lg align-center"
          >
            <v-btn
              variant="tonal"
              icon="mdi-plus"
              color="primary"
              size="x-large"
              elevation="4"
            ></v-btn>
          </div>
          -->
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import newStep from "@/components/newStep.vue";
import newTaskVue from "@/components/newTask.vue";
export default {
  components: {
    newStep,
    newTaskVue,
  },
  setup() {
    const modalTask = ref(newTaskVue);
    const newStep = ref({
      id: 0,
    });
    const editList = ref(false);
    const checklists = ref([
      {
        id: 0,
        title: "Lavar Louça",
        subtitle: "Ainda Hoje",
        completed: false,
        items: [
          { id: 1, description: "Pratos", completed: false },
          { id: 2, description: "Talheres", completed: false },
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
    function onEditItem(item) {
      console.log("Alterou o item", item);
      //#DB
    }

    function editTask(editlist) {
      console.log("Editou", editlist);
      //#DB
    }

    function completeChecklist(checklist) {
      checklist.completed = true;
      checklist.items.forEach((element) => {
        element.completed = true;
      });
      //#DB
    }
    function addList(list) {
      console.log(list);

      //#DB
    }
    function onDeleteList(listId) {
      console.log(listId);
    }
    function onEditList(listId) {
      console.log(listId);
      console.log(modalTask.value);
      //#DB
    }
    function onAddNewStep(step) {
      console.log("Adidionou", step);

      //#DB
    }

    const deleteItem = (id) => {
      console.log("Excluiu o item", id);
      //#DB
    };

    return {
      completeChecklist,
      onDeleteList,
      checklists,
      deleteItem,
      editList,
      onEditItem,
      onAddNewStep,
      editTask,
      newStep,
      addList,
      onEditList,
    };
  },
};
</script>
<style>
.v-messages {
  display: none;
  padding: 0;
  margin: 0;
  height: 0;
}
.v-input__details {
  display: none;
  padding: 0;
  margin: 0;
  height: 0;
}
</style>
