// CRUD System for Portfolio Management
// Uses localStorage for temporary storage (replace with PHP later)

// Initialize data if not exists
function initializeData() {
    if (!localStorage.getItem('portfolio_projects')) {
        const defaultProjects = [
            {
                id: 1,
                title: "Ergonomic Workspace",
                description: "A comprehensive study of ergonomic design principles applied to modern workspaces.",
                image: "project-1.png",
                status: "published"
            },
            {
                id: 2,
                title: "Modern Furniture Collection",
                description: "Contemporary furniture designs focusing on minimalism and functionality.",
                image: "project-2.png",
                status: "published"
            },
            {
                id: 3,
                title: "Industrial Innovation",
                description: "Exploring industrial design solutions for manufacturing efficiency.",
                image: "project-3.png",
                status: "published"
            },
            {
                id: 4,
                title: "Minimal Product Line",
                description: "Clean, minimalist product designs for everyday use.",
                image: "project-4.png",
                status: "published"
            },
            {
                id: 5,
                title: "Design Process",
                description: "Documentation of design methodology and creative workflow.",
                image: "project-5.png",
                status: "draft"
            },
            {
                id: 6,
                title: "Tech Integration",
                description: "Merging technology with traditional design approaches.",
                image: "project-6.png",
                status: "draft"
            }
        ];
        localStorage.setItem('portfolio_projects', JSON.stringify(defaultProjects));
    }

    if (!localStorage.getItem('site_settings')) {
        const defaultSettings = {
            name: "Borislav Korabev",
            title: "Product Designer",
            bio: "Borislav Korabev is a product designer and illustrator who brings creativity and focus to the design field innovative design and solution-orientated UX challenges. Believing reality with functionality and aesthetics into meaningful experiences.",
            email: "contact@borislav.com",
            instagram: "https://instagram.com/borislav",
            artstation: "https://artstation.com/borislav",
            behance: "https://behance.net/borislav"
        };
        localStorage.setItem('site_settings', JSON.stringify(defaultSettings));
    }
}

// Get all projects
function getProjects() {
    return JSON.parse(localStorage.getItem('portfolio_projects') || '[]');
}

// Get single project by ID
function getProjectById(id) {
    const projects = getProjects();
    return projects.find(project => project.id == id);
}

// Create new project
function createProject(projectData) {
    const projects = getProjects();
    const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    
    const newProject = {
        id: newId,
        title: projectData.title,
        description: projectData.description,
        image: projectData.image || 'placeholder.png',
        status: projectData.status || 'draft'
    };
    
    projects.push(newProject);
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
    return newProject;
}

// Update existing project
function updateProject(id, projectData) {
    const projects = getProjects();
    const index = projects.findIndex(project => project.id == id);
    
    if (index !== -1) {
        projects[index] = {
            ...projects[index],
            ...projectData
        };
        localStorage.setItem('portfolio_projects', JSON.stringify(projects));
        return projects[index];
    }
    return null;
}

// Delete project
function deleteProject(id) {
    let projects = getProjects();
    const initialLength = projects.length;
    
    projects = projects.filter(project => project.id != id);
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
    
    return projects.length < initialLength;
}

// Get site settings
function getSiteSettings() {
    return JSON.parse(localStorage.getItem('site_settings') || '{}');
}

// Update site settings
function updateSiteSettings(settingsData) {
    const currentSettings = getSiteSettings();
    const updatedSettings = {
        ...currentSettings,
        ...settingsData
    };
    localStorage.setItem('site_settings', JSON.stringify(updatedSettings));
    return updatedSettings;
}

// Image upload handler (client-side preview only)
function handleImageUpload(inputElement, previewElement, callback) {
    const file = inputElement.files[0];
    if (!file) return;

    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
        alert('Please upload a valid image file (JPG, PNG, or WebP)');
        return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        if (previewElement) {
            previewElement.src = e.target.result;
            previewElement.style.display = 'block';
        }
        
        // For now, we'll just store the filename
        // When you add PHP, this will upload to server
        const fileName = 'uploaded_' + Date.now() + '_' + file.name;
        if (callback) callback(fileName, e.target.result);
    };
    reader.readAsDataURL(file);
}

// Initialize on load
initializeData();