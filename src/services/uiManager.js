import Sidebar from "../components/sidebar.js";
import projectManager from "./projectManager.js";

const UIManager = (function () {
    
    const initialiseUI = () => {
        projectManager.loadProjects();
        
        const body = document.querySelector("body");
        const app = document.createElement("div");
        app.classList.add("app");

        app.appendChild(Sidebar.createSidebar());
        app.appendChild(createMainContent());
        body.append(app);
    };

    const createMainContent = () => {
        const content = document.createElement("div");
        content.classList.add("content");

        return content;
    }

    return { initialiseUI };
})();

export default UIManager;
