import domController from './index'
import { projectsList } from './newProject';

const newToDoFactory = (title, description, dueDate, priority, completed) => {
    return { title, description, dueDate, priority, completed }
}

function newToDo(project) {
    const contentContainer = document.querySelector('.content-container');
    const container = document.createElement('div');
    container.classList.add('new-project-form');
    container.innerHTML = `
    <button type="button" class="project-x-out">X</button>
    <h4>Create a new To-Do</h4>
    <form>
        <label for="todo-title">Title:</label><br>
        <input type="text" id="todo-title" name="todo-title"><br>
        <label for="todo-description">Description:</label><br>
        <input type="text" id="todo-description" name="todo-description"><br>
        <label for="todo-date">Due Date:</label><br>
        <input type="date" id="todo-date" name="todo-date"><br>
        <label for="todo-priority">Priority:</label><br>
        <select name="todo-priority" id="todo-priority"><br>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
        </select><br>
        <button type="button" class="create-project-btn">Create To-Do</div>
    </form>

    `;
    contentContainer.appendChild(container);
    const createBtn = document.querySelector('.create-project-btn');
    createBtn.addEventListener('click', function() {
        createNewToDo(project)
    });
    const projectXOut = document.querySelector('.project-x-out');
    projectXOut.addEventListener('click', function() { domController.exitNewProject(container); });
}

function createNewToDo(project) {
    const title = document.querySelector('#todo-title').value;
    const description = document.querySelector('#todo-description').value;
    const dueDate = document.querySelector('#todo-date').value;
    const priority = document.querySelector('#todo-priority').value;
    const newToDo = newToDoFactory(title, description, dueDate, priority);
    
    project.toDos.push(newToDo);
    localStorage.setItem('projects', JSON.stringify(projectsList));
    domController.viewToDos(project);
    const form = document.querySelector('.new-project-form');
    if (form) {
        domController.exitNewProject(form);
    }
}

function deleteToDo(todo, project) {
    let list = project.toDos;
    const index = list.indexOf(todo);
    if (index > -1) {
        list.splice(index, 1);
    }
    localStorage.setItem('projects', JSON.stringify(projectsList));
    domController.viewToDos(project);
}


export { newToDoFactory, newToDo, createNewToDo, deleteToDo };