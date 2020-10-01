import { newProject, newProjectFactory, createNewProject, projectsList, deleteProject } from './newProject';
import { newToDoFactory, newToDo, deleteToDo } from './newToDo';

// DOM Control
const domController = (() => {
    const toggleMenu = () => {
        menuToggleIcon.classList.toggle('toggle-on');
        if (menuToggleIcon.classList.contains('toggle-on')) {
            menuToggleIcon.innerText = "v Projects"
            projectsList.forEach(project => {
                addProject(project);
            })
        } else {
            menuToggleIcon.innerText = "> Projects"
            projectSelect.innerHTML = "";
        }
    }

    const updateMenu = () => {
        if (menuToggleIcon.classList.contains('toggle-on')) {
            projectSelect.innerHTML = "";
            projectsList.forEach(project => {
                addProject(project);
            })
        }
    }
    
    const addProject = (project) => {
        if (menuToggleIcon.classList.contains('toggle-on')) {
            const container = document.createElement('div');
            container.classList.add('project-btn-grid');
            projectSelect.appendChild(container);
            const div = document.createElement('div');
            div.classList.add('project-item-btn');
            container.appendChild(div);
            const p = document.createElement('p');
            p.classList.add('project-item');
            p.innerText = project.title;
            div.appendChild(p);
            div.addEventListener('click', function() {
                viewProject(project);
            });
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-btn');
            deleteBtn.innerText = "X";
            deleteBtn.addEventListener('click', function(){
                deleteProject(project);
            });
            container.appendChild(deleteBtn);
        }
        if (formOpen()) {
            formOpen().parentNode.removeChild(formOpen());
        }
    }

    const formOpen = () => {
        const form = document.querySelector('.new-project-form');
        if (form) {
            return form;
        } else {
            return false;
        }
    }

    const exitNewProject = (div) => {
        div.parentNode.removeChild(div);
    }

    const viewProject = (project) => {
        const container = document.querySelector('.project-ui')
        container.innerHTML = `
        <h3 class="project-title">${project.title}</h3>
        <button type="button" class="new-todo-button">New To-Do</button>
        <table>
            <thead>
                <tr>
                    <th>Completed</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Due Date</th>
                    <th>Priority</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
        `
        const newToDoBtn = document.querySelector('.new-todo-button');
        newToDoBtn.addEventListener('click', function() {
            newToDo(project);
        });
    
        viewToDos(project);
    }

    const viewToDos = (project) => {
        const table = document.querySelector('table');
        const tbody = document.querySelector('tbody');
        tbody.innerHTML = "";
        
        project.toDos.forEach(todo => {
            const tr = document.createElement('tr');
            tr.classList.add('table-row');
            tbody.appendChild(tr);

            const th1 = document.createElement('th');
            const th2 = document.createElement('th');
            const th3 = document.createElement('th');
            const th4 = document.createElement('th');
            const th5 = document.createElement('th');
            const th6 = document.createElement('th');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            if (todo.completed === true) {
                checkbox.checked = true;
            } else {
                checkbox.checked = false;
            }

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-btn');
            deleteBtn.innerText = "X";
            deleteBtn.addEventListener('click', function(){
                deleteToDo(todo, project);
            });
            
            th2.innerText = todo.title;
            th3.innerText = todo.description;
            th4.innerText = todo.dueDate;
            th5.innerText = todo.priority;
            
            tr.appendChild(th1);
            th1.appendChild(checkbox);
            tr.appendChild(th2);
            tr.appendChild(th3);
            tr.appendChild(th4);
            tr.appendChild(th5);
            tr.appendChild(th6);
            th6.appendChild(deleteBtn);
        })
    }
    // Buttons and Event Listeners 
    const projectSelect = document.querySelector('.project-select');
    const contentContainer = document.querySelector('.content-container');
    const menuToggleIcon = document.querySelector('.toggle-view-icon');
    menuToggleIcon.addEventListener('click', toggleMenu);
    
    const existingProjects = JSON.parse(localStorage.getItem('projects'));
    if (existingProjects.length > 0) {
        existingProjects.forEach(project => {
            projectsList.push(project);
            addProject(project);
        })
    } else {
        const defaultProject = newProjectFactory('Default Project');
        projectsList.push(defaultProject);
        const aToDo = newToDoFactory('Do Stuff', 'Do it', 'Now', 'High', true);
        defaultProject.toDos.push(aToDo);
        viewProject(defaultProject);
    }
    
    const newProjectBtn = document.querySelector('.new-project-button');
    newProjectBtn.addEventListener('click', newProject);
    return { toggleMenu, addProject, exitNewProject, viewToDos, updateMenu }
})();

export default domController;