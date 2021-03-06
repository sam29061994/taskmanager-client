<template>
  <div class="list-wrapper">
    <input
      type="text"
      placeholder="Let's do some work today.."
      class="input"
      @keyup.enter="addItem"
      v-model="newTodo"
      v-focus
    />
    <todo-item
      v-for="(todo, index) in filteredItems"
      :key="todo.id"
      :todo="todo"
      :index="index"
      :selectAll="!itemsLeft && !!todos.length"
      @removedItem="removeItem"
      @editItemFinished="editItemFinished"
    />
  </div>

  <footer>
    <hr />
    <div class="footer-wrapper">
      <div class="select-all-item-counter-container">
        <div>
          <input
            class="select-all-checkbox"
            type="checkbox"
            :checked="!itemsLeft && todos.length"
            @change="checkAllItems"
          /><span class="select-all-text">Select All</span>
        </div>
        <span>{{ itemsLeft }} Items left</span>
      </div>
      <hr />
      <div class="action-buttons-container">
        <button
          :class="{ active: filterType === 'All' }"
          @click="changeFilterType('All')"
        >
          All
        </button>
        <button
          :class="{ active: filterType === 'Active' }"
          @click="changeFilterType('Active')"
        >
          Active
        </button>
        <button
          :class="{ active: filterType === 'Completed' }"
          @click="changeFilterType('Completed')"
        >
          Completed
        </button>
        <button class="remove-completed-button" @click="clearCompletedItems">
          Clear Completed
        </button>
      </div>
    </div>
  </footer>
</template>

<script>
import TodoItem from './TodoItem';
import { defineComponent } from 'vue';
import axios from '../../modules/api';


export default defineComponent({
  name: 'todo-list',
  components: {
    TodoItem,
  },
  data() {
    return {
      newTodo: '',
      cachedTitle: '',
      newItemId: 0,
      filterType: 'All',
      todos: [],
      token: null,
    };
  },
  async created() {
    this.token = localStorage.getItem('access_token');

    if (this.token) {
      axios.defaults.headers = { Authorization: `bearer ${this.token}` };
    }

    const { data } = await axios.get('/tasks');
    this.todos = data.map((todo) => ({
      ...todo,
      editing: false,
      cachedTitle: '',
    }));
  },

  methods: {
    async addItem() {
      if (this.newTodo.trim().length === 0) return;
      const { data } = await axios.post('tasks', {
        title: this.newTodo.trim(),
      });
      this.todos.push(data);
      this.newTodo = '';
    },

    async removeItem({ index, id }) {
      await axios.delete(`/tasks/${id}`);
      this.todos.splice(index, 1);
    },
    async editItemFinished({ index, todo }) {
      await axios.patch(`/tasks/${todo.id}`, {
        title: todo.title,
        completed: todo.completed,
      });

      this.todos.splice(index, 1, todo);
    },

    async checkAllItems(event) {
      await axios.patch(
        `/tasks/selectAll
      `,
        { completed: event.target.checked },
      );
      this.todos.forEach((todo) => (todo.completed = event.target.checked));
    },
    changeFilterType(filterType) {
      this.filterType = filterType;
    },
    async clearCompletedItems() {
      await axios.delete('tasks/completed');
      this.todos = this.todos.filter((todo) => !todo.completed);
    },
  },
  computed: {
    itemsLeft() {
      return this.todos.filter((todo) => !todo.completed).length;
    },
    filteredItems() {
      if (this.filterType === 'Active') {
        return this.todos.filter((todo) => todo.completed === false);
      } else if (this.filterType === 'Completed') {
        return this.todos.filter((todo) => todo.completed === true);
      } else {
        return this.todos;
      }
    },
  },
  watch: {
    token(val) {
      if (!val) {
        this.$router.push({ name: 'Signin' });
      }
    },
  },
});
</script>

<style lang="scss">
.list-wrapper {
  margin-bottom: 40px;

  .input {
    width: 100%;
    height: 40px;
    font-size: 20px;
    margin-bottom: 20px;

    @media screen and (max-width: 600px) {
      font-size: 15px;
    }
  }
}

.select-all-item-counter-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;

  @media screen and (max-width: 600px) {
    font-size: 15px;
  }

  .select-all-checkbox {
    transform: scale(1.5);

    @media screen and (max-width: 600px) {
      transform: scale(1);
    }
    margin-right: 15px;
  }
  .select-all-text {
    font-size: 20px;
    @media screen and (max-width: 600px) {
      font-size: 15px;
    }
  }

  .remove-completed-button {
    background: transparent;
    font-size: 20px;
    color: #2c3e50;
    border: none;
  }
}

.action-buttons-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;

  Button {
    background: transparent;
    font-size: 25px;
    color: #2c3e50;
    border: 0.5px solid #2c3e50;
    border-radius: 3px;

    &.active {
      background-color: lightgreen;
    }

    &.remove-completed-button {
      border: none;
      color: salmon;
      cursor: pointer;
    }

    @media screen and (max-width: 600px) {
      font-size: 15px;
    }
  }
}

.logout-btn {
  width: 30%;
  position: absolute;
  right: 0px;
}
</style>
