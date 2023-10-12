<template>
  <div class="w-100 h-100">
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
              v-on:update:model-value="onEditItem(checklist.id, item)"
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
              @click="deleteItem(item.id, checklist.id)"
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
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ref, watch, onMounted, computed } from "vue";
import newStep from "@/components/newStep.vue";
import newTaskVue from "@/components/newTask.vue";
import { useStore } from "vuex";
export default {
  components: {
    newStep,
    newTaskVue,
  },
  setup() {
    const store = useStore();
    const newStep = ref({
      id: 0,
    });
    const editList = ref(false);
    const checklists = computed(() => store.state.checklists);

    watch(checklists, (newChecklists) => {
      if (newChecklists.length === undefined || !!newChecklists == false)
        return;
      newChecklists.forEach((checklist) => {
        if (!!checklist.item == false) return;
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
    onMounted(() => {
      store.dispatch("getChecklists");
    });
    function onEditItem(listId, item) {
      item.listId = listId;
      store.dispatch("editTask", item);
    }

    function editTask(editlist) {
      store.dispatch("editCheckList", editlist);
    }

    function completeChecklist(checklist) {
      checklist.completed = true;
      checklist.items.forEach((element) => {
        element.completed = true;
      });
      store.dispatch("editCheckList", checklist);
    }
    function addList(list) {
      store.dispatch("newCheckList", list);
    }
    function onDeleteList(listId) {
      store.dispatch("deleteChecklist", listId);
    }

    function onAddNewStep(step) {
      store.dispatch("newStep", step);
    }

    const deleteItem = (id, listId) => {
      store.dispatch("deleteTask", { id: id, listId: listId });
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
