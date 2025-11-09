/******************************************************************************** 
*  WEB322 – Assignment 01 
*  
*  I declare that this assignment is my own work in accordance with Seneca's 
*  Academic Integrity Policy: 
*  
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html 
*  
*  Name: Ileperuma Achchige Dineth Damishka Gunarathna 
*  Student ID: 130673247 
*  Date: 09/30/2025 
* 
********************************************************************************/

const express = require('express');
const path = require('path');
const projectData = require('./modules/projects');

const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files
app.use(express.static('public'));

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Initialize project data before starting server
projectData.initialize()
  .then(() => {
    console.log('Project data initialized.');

    // Routes
    app.get('/', (req, res) => res.render('home', {page: '/'}));
    app.get('/about', (req, res) => res.render('about', {page: '/about'}));

    app.get("/solutions/projects", (req, res) => {
  // Check if there is a query parameter for sector
  const sector = req.query.sector;

  let promise;
  if (sector) {
    promise = projectData.getProjectsBySector(sector);
  } else {
    promise = projectData.getAllProjects();
  }

  promise
    .then(projects => {
      res.render("projects", { projects: projects });
    })
    .catch(err => {
      res.status(404).render("404", { message: err });
    });
});


    app.get('/solutions/projects/:id', async (req, res) => {
      try {
        const id = parseInt(req.params.id);
        const project = await projectData.getProjectById(id);
        res.render('project', {project, page: ''});
      } catch (err) {
        res.status(404).render('404', {message: err, page: ''});
      }
    });

    // 404 handler
    app.use((req, res) => {
      res.status(404).render('404', {message: "Page not found", page: ''});
    });

    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('Failed to initialize:', err));