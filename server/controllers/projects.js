import User from '../models/User.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import Project from '../models/Project.js';
import Comment from '../models/Comment.js';


//Create project
export const createProject = async (req, res) => {
  try {
    const { title, text, team, downdloadLink } = req.body;
    const user = await User.findById(req.userId);

    if (req.files) {
      let fileName = Date.now().toString() + req.files.image.name;
      const __dirname = dirname(fileURLToPath(import.meta.url));
      req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName));

      const newProjectWithImage = new Project({
        username: user.username,
        title,
        text,
        imgUrl: fileName,
        author: req.userId,
        team,
        downdloadLink,
        // evaluation : 'N/A',
        phase1: 'N/A',
        phase2: 'N/A',
        phase3: 'N/A',
      });

      await newProjectWithImage.save();
      await User.findByIdAndUpdate(req.userId, {
        $push: { projects: newProjectWithImage },
      });

      return res.json({ newProjectWithImage, message: 'Project was created' });
    }

    const newProjectWithoutImage = new Project({
      username: user.username,
      title,
      text,
      imageUrl: '',
      author: req.userId,
      team,
      downdloadLink,
      // evaluation : 'N/A',
      phase1: 'N/A',
      phase2: 'N/A',
      phase3: 'N/A',
    });
    await newProjectWithoutImage.save();
    await User.findByIdAndUpdate(req.userId, {
      $push: { projects: newProjectWithoutImage },
    });

    return res.json({ newProjectWithoutImage, message: 'Project was created' });
  } catch (error) {
    res.json({
      message: "Project wasn't created, something went wrong",
    });
  }
};


//Get all projects
export const getAll = async (req, res) => {
  try {
    const projects = await Project.find().sort('-createdAt');
    const popularProjects = await Project.find().limit(5).sort('-views');
    if (!projects) {
      return res.json({ message: 'No projects' });
    }

    return res.json({ projects, popularProjects });
  } catch (error) {
    res.json({ message: 'Something went wrong' });
  }
};


//Get project by id
export const getById = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });

    res.json(project);
  } catch (error) {
    res.json({ message: 'Something went wrong' });
  }
};


//Get my projects
export const getMyProjects = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const list = await Promise.all(
      user.projects.map((project) => {
        return Project.findById(project._id);
      })
    )

    res.json(list);
  } catch (error) {
    res.json({ message: 'Something went wrong' });
  }
};


//Remove project
export const removeProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.json({ message: "Project doesn't exist" });

    await User.findByIdAndUpdate(req.userId, {
      //у юзера которого находим по айди с запроса
      $pull: { projects: req.params.id }, //удаляем из массива проектов , проект по данному айди
    });

    res.json({ message: 'Project was deleted' });
  } catch (error) {
    res.json({ message: 'Something went wrong' });
  }
};


//Update project
export const updateProject = async (req, res) => {
  try {
    const { id, title, text, team, downdloadLink, phase1, phase2, phase3 } = req.body;
    const project = await Project.findById(id);

    if (req.files) {
      let fileName = Date.now().toString() + req.files.image.name;
      const __dirname = dirname(fileURLToPath(import.meta.url));
      req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName));
      project.imgUrl = fileName || '';
    }

    project.title = title;
    project.text = text;
    project.team = team;
    project.downdloadLink = downdloadLink;
    project.phase1 = phase1;
    project.phase2 = phase2;
    project.phase3 = phase3;

    await project.save();
    res.json(project);
  } catch (error) {
    res.json({ message: 'Something went wrong' });
  }
};


//Get project comments
export const getProjectComments = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    const list = await Promise.all(
      project.comments.map((comment) => {
        return Comment.findById(comment)
      })
    )

    res.json(list);
  } catch (error) {
    res.json({ message: 'Something went wrong' });
  }
};
