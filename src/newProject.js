import domController from './index'

let projectsList = [];

const newProjectFactory = (title) => {
    let toDos = [];
    let open = true;
    const addToDo = () => {
        // Stuff
    }
    return { title, open, toDos };
};

function newProject() {
    const contentContainer = document.querySelector('.content-container');
    const container = document.createElement('div');
    container.classList.add('new-project-form');
    container.innerHTML = `
    <button type="button" class="project-x-out">X</button>
    <h4>Create a new project</h4>
    <form>
        <label for="project-title">Project Title:</label>
        <input type="text" id="project-title" name="project-title">
        <button type="button" class="create-project-btn">Create Project</div>
    </form>

    `;
    contentContainer.appendChild(container);
    const createBtn = document.querySelector('.create-project-btn');
    createBtn.addEventListener('click', createNewProject);
    const projectXOut = document.querySelector('.project-x-out');
    projectXOut.addEventListener('click', function() { domController.exitNewProject(container); });
}

function createNewProject() {
    const title = document.querySelector('#project-title').value;
    const newProject = newProjectFactory(title);
    projectsList.push(newProject);
    localStorage.setItem('projects', JSON.stringify(projectsList));
    domController.addProject(newProject);
}

function deleteProject(project) {
    const index = projectsList.indexOf(project);
    console.log(index);
    if (index > -1) {
        projectsList.splice(index, 1);
    }
    localStorage.setItem('projects', JSON.stringify(projectsList));
    domController.updateMenu();
}

export { 
    newProject,
    newProjectFactory,
    projectsList,
    deleteProject,
};