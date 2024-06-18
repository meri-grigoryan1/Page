const todoList = document.querySelector('.list-group');
const form = document.querySelector('#form');
const todoInput = document.querySelector('#todo');
const clearBtn = document.querySelector('#clearBtn');
const search = document.querySelector('#search');

allEventListners();


function allEventListners() {
    form.addEventListener('submit', addTodo);
    todoList.addEventListener('click', removeTodo);
    clearBtn.addEventListener('click', clearTodoList);
    search.addEventListener('keyup', searchTodo);
}


function addTodo(e) {
    if (todoInput.value !== '') {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `<i class="far fa-square done-icon"></i>
                        <i class="far fa-check-square done-icon"></i>
                        <i class="far fa-trash-alt"></i>`;
        const span = document.createElement('span');
        span.className = 'todo-text';
        span.appendChild(document.createTextNode(todoInput.value));
        li.appendChild(span);
        todoList.appendChild(li);

        todoInput.value = '';
    } else {
        alert('Please add todo');
    }

    e.preventDefault();
}


function removeTodo(e) {
    if (e.target.classList.contains('fa-trash-alt')) {
        if (confirm('Are you sure')) {
            e.target.parentElement.remove();
        }
    }

    if (e.target.classList.contains('todo-text')) {
        e.target.parentElement.classList.toggle('done');
    }
    if (e.target.classList.contains('done-icon')) {
        e.target.parentElement.classList.toggle('done');
    }
}


function clearTodoList() {
    todoList.innerHTML = '';
}


function searchTodo(e) {
    const text = e.target.value.toLowerCase();
    const allItem = document.querySelectorAll('.list-group-item');
    for (let task of allItem) {
        const item = task.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    };
}