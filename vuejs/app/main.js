/**
 * Created by leow on 12/9/15.
 */
import Vue from 'vue';

new Vue({
    el: '#app',
    data: {
        newTodo: '',
        todos: [
            {text: 'Add some todos'}
        ]
    },
    methods: {
        addTodo: function () {
            var text = this.newTodo.trim()
            if (text) {
                this.todos.push({text: text})
                this.newTodo = ''
            }
        },
        removeTodo: function (index) {
            this.todos.splice(index, 1)
        }
    }
})