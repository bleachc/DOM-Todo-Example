window.addEventListener('load', () => {
    const getStorage = () => localStorage.getItem('storage') === 'local' ? localStorage : sessionStorage
    const setStorageValue = (key, value) => getStorage().setItem(key, JSON.stringify(value))
    const getStorageValue = (key) => JSON.parse(getStorage().getItem(key))

    const removeTodo = (e) => {
        e.target.parentNode.remove()
        setStorageValue('todos', getStorageValue('todos').filter(t => t !== e.target.parentNode.getElementsByTagName('SPAN')[0].textContent))
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
        setStorageValue('todos', [...(getStorageValue('todos') || []), todo])

        appendTodo(todo)

        document.getElementById('todo').value = ''
    }

    const init = () => {
        const storageType = localStorage.getItem('storage') || 'local'
        localStorage.setItem('storage', storageType)
        document.getElementById('storage').value = storageType

        const todos = JSON.parse(storageType === 'local' ? localStorage.getItem('todos') : sessionStorage.getItem('todos'))
        todos?.forEach(todo => appendTodo(todo))

        document.getElementById('storage').addEventListener('change', (e) => {
            if (e.target.value === localStorage.getItem('storage')) return

            if (e.target.value === 'local') {
                localStorage.setItem('todos', sessionStorage.getItem('todos'))
                sessionStorage.removeItem('todos')
                localStorage.setItem('storage', 'local')
            } else {
                sessionStorage.setItem('todos', localStorage.getItem('todos'))
                localStorage.removeItem('todos')
                localStorage.setItem('storage', 'session')
            }
        })

        document.getElementById('add-todo-form').addEventListener('submit', addTodo)

        document
            .querySelectorAll('#todos-container button')
            .forEach(el => el.addEventListener('click', removeTodo))
    }

    init()
})
