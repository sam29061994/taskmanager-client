<template>
  <div class="todo-item">
    <input
      type="checkbox"
      class="checkbox"
      v-model="completed"
      :checked="completed"
      @change="editItemFinished"
    />
    <div
      v-if="!editing"
      :class="{ completed: completed }"
      class="title"
      @dblclick="editItemStart"
    >
      {{ todo.title }}
    </div>
    <input
      v-else
      type="text"
      class="edit-item"
      v-model="title"
      @keyup.enter="editItemFinished"
      @blur="editItemFinished"
      @keyup.escape="editItemCancelled"
      v-focus
    />
    <div class="remove-item" @click="removeItem">&#x2573;</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "todo-item",
  props: {
    todo: {
      type: Object,
      required: true,
    },
    selectAll: {
      type: Boolean,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      completed: this.todo.completed || this.selectAll,
      editing: this.todo.editing,
      cachedTitle: "",
    };
  },
  methods: {
    removeItem() {
      this.$emit("removedItem", { index: this.index, id: this.id });
    },
    editItemStart() {
      this.cachedTitle = this.title;
      this.editing = true;
    },

    editItemFinished() {
      if (this.title.trim() === "") {
        this.title = this.cachedTitle;
      }

      this.editing = false;
      this.$emit("editItemFinished", {
        index: this.index,
        todo: {
          id: this.id,
          title: this.title,
          completed: this.completed,
          editing: this.editing,
          cachedTitle: "",
        },
      });
    },

    editItemCancelled() {
      this.title = this.cachedTitle;
      this.editing = false;
    },
  },
  watch: {
    selectAll() {
      this.completed = this.selectAll;
    },
  },
});
</script>

<style  lang="scss" scoped>
.todo-item {
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;

  @media screen and (max-width: 600px) {
    font-size: 15px;
  }

  .title {
    text-align: left;
    flex-grow: 2;
  }

  .checkbox {
    transform: scale(1.5);
    margin-right: 15px;
  }

  .remove-item {
    cursor: pointer;
  }
  .edit-item {
    font-size: 20px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    text-align: left;
    flex-grow: 2;
    border: 1px solid #ccc;
    margin-right: 5px;
  }
  .completed {
    text-decoration: line-through;
  }
}
</style>

