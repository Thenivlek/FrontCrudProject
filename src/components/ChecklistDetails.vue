<template>
  <v-container>
    <v-card>
      <v-card-title>{{ checklist.title }}</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="item in checklist.items" :key="item.id">
            <v-list-item-icon>
              <v-icon v-if="item.completed" color="green">mdi-checkbox-marked</v-icon>
              <v-icon v-else color="red">mdi-checkbox-blank-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.description }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="completeItem(item)" v-for="item in checklist.items" :key="item.id">
          {{ item.completed ? 'Desfazer' : 'Concluir' }} {{ item.description }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      checklist: {
        id: 1,
        title: 'Checklist 1',
        completed: false,
        items: [
          { id: 1, description: 'Item 1', completed: false },
          { id: 2, description: 'Item 2', completed: true },
          // ... adicione mais itens aqui
        ],
      },
    };
  },
  methods: {
    completeItem(item) {
      item.completed = !item.completed;
      // Implemente a lógica para salvar o status de conclusão do item no backend aqui
    },
  },
};
</script>
