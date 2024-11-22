const Project = require('../model/project');
const user = require('../model/user');
const User = require('../model/user');


const createProject = async(req,res)=>{
    const {projectName ,  description, startDate, endDate, assignedTo}=req.body;
    console.log("**** Created ProjectDeatails ", req.body);
    
    try {
        if (req.user.role !== 'Admin') {
            return res.status(403).json({ message: 'You do not have permission to create projects.' });
          }
          if (!projectName || !description || !startDate || !endDate || !assignedTo) {
            return res.status(400).json({ message: 'Missing required fields' });
          }
          
          const newProject = new Project({
            projectName,
            description,
            startDate , 
            endDate , 
            createdBy:req.user._id,
            assignedTo
          });
          await newProject.save();
          res.status(201).json({ message: 'Project created successfully!', project: newProject });
    } catch (error) {
        
    }
};

module.exports = {createProject}