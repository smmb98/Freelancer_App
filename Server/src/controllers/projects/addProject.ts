import { AppDataSource } from "../../data-source";
import { Projects } from "../../entities/Projects";

export const addProject = async (req, res) => {
  try {
    const {
      title,
      description,
      mobileNumber,
      emailAddress,
      category,
      budget,
      deadline,
    } = req.body;

    const ProjectRepository = AppDataSource.getRepository(Projects);
    const Project = new Projects();

    Project.title = title;
    Project.description = description;
    Project.mobileNumber = mobileNumber;
    Project.emailAddress = emailAddress;
    Project.category = category;
    Project.budget = budget;
    Project.deadline = deadline;
    Project.projectOwner = req.currentUser.id;
    ProjectRepository.save(Project);

    res.send(Project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
