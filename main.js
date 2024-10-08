const textInput = document.querySelector('.text-input');
const todoListElement = document.querySelector('.todo-items');

const todoList = JSON.parse(localStorage.getItem('todoList')) || [];


todoList.forEach((task, index) => {
    createTodoRow(index, task.taskName, task.isCompleted);
});


textInput.addEventListener('keyup', event => {
    if (event.keyCode === 13) {
        if (event.target.value !== '') {
            todoList.push({
                taskName: event.target.value,
                isCompleted: false,
            });
        }

        createTodoRow(todoList.length - 1, event.target.value);
        updateLocalStorage(todoList);
        event.target.value = '';
    }
});

function updateLocalStorage(todoList) {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

function createTodoRow(index, todoText, isCompleted) {
    const todoItemRow = document.createElement('div');
    todoItemRow.classList.add('todo-list-item-row');
    const checkboxInput = document.createElement('input');
    checkboxInput.type = 'checkbox';
    checkboxInput.checked = isCompleted;
    checkboxInput.classList.add('todo-item-checkbox');
    const todoItemText = document.createElement('h3');
    todoItemText.textContent = todoText;
    if (isCompleted) {
        todoItemText.classList.toggle('completed-text');
    }
    todoItemText.classList.add('todo-item-text');
    const deleteButton = document.createElement('input');
    deleteButton.type = 'button';
    deleteButton.value = 'Delete';
    deleteButton.classList.add('delete-btn');


    checkboxInput.addEventListener('change', _event => {
        todoItemText.classList.toggle('completed-text');
        todoList[index].isCompleted = !todoList[index].isCompleted;
        updateLocalStorage(todoList);
    })
    deleteButton.addEventListener('click', _e => {
        todoItemRow.remove();
        todoList.splice(index, 1);
        updateLocalStorage(todoList);
    })

    todoItemRow.append(checkboxInput);
    todoItemRow.append(todoItemText);
    todoItemRow.append(deleteButton);
    todoListElement.append(todoItemRow);
}
