const removeTodo = (e) => {
    e.target.parentNode.remove()
}

const appendTodo = (todo) => {
    const listItem = document.createElement('li')
    listItem.className = 'todo-item'

    const todoTextElement = document.createElement('span')
    todoTextElement.textContent = todo

    const todoRemoveButton = document.createElement('button')
    todoRemoveButton.textContent = 'Remove'
    todoRemoveButton.addEventListener('click', removeTodo)

    listItem.appendChild(todoTextElement)
    listItem.appendChild(todoRemoveButton)

    document.getElementById('todos-container').appendChild(listItem)
}

const addTodo = (event) => {
    event.preventDefault()

    const todo = document.getElementById('todo').value

    appendTodo(todo)

    document.getElementById('todo').value = ''
}

window.addEventListener('load', () => {
    document.getElementById('add-todo-form').addEventListener('submit', addTodo)
    document
        .querySelectorAll('#todos-container button')
        .forEach(el => el.addEventListener('click', removeTodo))
})
