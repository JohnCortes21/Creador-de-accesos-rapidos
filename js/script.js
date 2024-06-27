document.addEventListener('DOMContentLoaded', loadSites);

let editMode = false;
let editedSiteIndex = -1;

function addSite() {
    const siteName = document.getElementById('siteName').value;
    const siteURL = document.getElementById('siteURL').value;

    if (siteName && siteURL) {
        if (editMode) {
            updateSite(siteName, siteURL);
        } else {
            const site = { name: siteName, url: siteURL };
            saveSite(site);
            renderSite(site);
        }
        clearInputs();
        exitEditMode();
    } else {
        alert('Por favor, completa ambos campos');
    }
}

function saveSite(site) {
    let sites = JSON.parse(localStorage.getItem('sites')) || [];
    sites.push(site);
    localStorage.setItem('sites', JSON.stringify(sites));
}

function loadSites() {
    const sites = JSON.parse(localStorage.getItem('sites')) || [];
    sites.forEach(renderSite);
}

function renderSite(site, index) {
    const siteList = document.getElementById('sitesList');

    const siteDiv = document.createElement('div');
    siteDiv.className = 'site';

    const siteLink = document.createElement('a');
    siteLink.href = site.url;
    siteLink.target = '_blank';
    siteLink.innerText = site.name;

    const editButton = document.createElement('button');
    editButton.innerText = 'Editar';
    editButton.onclick = function () {
        enterEditMode(site, index);
    };

    const removeButton = document.createElement('button');
    removeButton.innerText = 'Eliminar';
    removeButton.onclick = function () {
        removeSite(index);
        siteList.removeChild(siteDiv);
    };

    siteDiv.appendChild(siteLink);
    siteDiv.appendChild(editButton);
    siteDiv.appendChild(removeButton);

    siteList.appendChild(siteDiv);
}

function removeSite(index) {
    let sites = JSON.parse(localStorage.getItem('sites')) || [];
    sites.splice(index, 1);
    localStorage.setItem('sites', JSON.stringify(sites));
}

function enterEditMode(site, index) {
    editMode = true;
    editedSiteIndex = index;

    document.getElementById('siteName').value = site.name;
    document.getElementById('siteURL').value = site.url;

    const addButton = document.getElementById('addButton');
    addButton.innerText = 'Guardar Cambios';
    addButton.style.backgroundColor = '#28a745';

    const cancelButton = document.createElement('button');
    cancelButton.innerText = 'Cancelar';
    cancelButton.className = 'cancelButton';
    cancelButton.onclick = function () {
        exitEditMode();
    };

    const inputContainer = document.getElementById('inputContainer');
    inputContainer.appendChild(cancelButton);
}

function updateSite(name, url) {
    let sites = JSON.parse(localStorage.getItem('sites')) || [];
    sites[editedSiteIndex].name = name;
    sites[editedSiteIndex].url = url;
    localStorage.setItem('sites', JSON.stringify(sites));

    const addButton = document.getElementById('addButton');
    addButton.innerText = 'Agregar';
    addButton.style.backgroundColor = '#007bff';

    const cancelButton = document.querySelector('.cancelButton');
    cancelButton.parentNode.removeChild(cancelButton);

    const sitesList = document.getElementById('sitesList');
    sitesList.innerHTML = '';
    sites.forEach(renderSite);

    editMode = false;
    editedSiteIndex = -1;
}

function exitEditMode() {
    const addButton = document.getElementById('addButton');
    addButton.innerText = 'Agregar';
    addButton.style.backgroundColor = '#007bff';

    const cancelButton = document.querySelector('.cancelButton');
    if (cancelButton) {
        cancelButton.parentNode.removeChild(cancelButton);
    }

    clearInputs();

    editMode = false;
    editedSiteIndex = -1;
}

function clearInputs() {
    document.getElementById('siteName').value = '';
    document.getElementById('siteURL').value = '';
}
