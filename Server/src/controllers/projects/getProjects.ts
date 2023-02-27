import { Not } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Status } from "../../entities/Freelancers_Projects";
import { Projects } from "../../entities/Projects";

export const getProjects = async (req, res) => {
  try {
    const ProjectRepository = AppDataSource.getRepository(Projects);

    const { filter, personal } = req.query;

    // Fetch every project from current user
    if (personal === "true") {
      if (filter === "none" || !filter) {
        const Projects = await ProjectRepository.find({
          order: {
            deadline: "DESC",
          },
          where: {
            projectOwner: { id: req.currentUser.id },
          },
          relations: {
            projectOwner: true,
            requests: {
              freelancer: true,
            },
          },
        });

        if (Projects.length > 0) {
          res.send(Projects);
        } else {
          res.send({ message: "Projects Empty" });
        }
      } else {
        const Projects = await ProjectRepository.find({
          order: {
            deadline: "DESC",
          },
          where: {
            projectOwner: { id: req.currentUser.id },
            status: filter,
          },
          relations: {
            projectOwner: true,
            requests: {
              freelancer: true,
            },
          },
        });

        if (Projects.length > 0) {
          res.send(Projects);
        } else {
          res.send({ message: `${filter} Projects Empty` });
        }
      }
      //
      // Fetch every project from every user, excluding current user's projects.
      //
    } else {
      if (filter === "none" || !filter) {
        const Projects = await ProjectRepository.find({
          order: {
            deadline: "DESC",
          },
          where: {
            projectOwner: { id: Not(req.currentUser.id) },
          },
          relations: {
            projectOwner: true,
            requests: {
              freelancer: true,
            },
          },
        });

        if (Projects.length > 0) {
          res.send(Projects);
        } else {
          res.send({ message: "Projects Empty" });
        }
      } else {
        const Projects = await ProjectRepository.find({
          order: {
            deadline: "DESC",
          },
          where: {
            projectOwner: { id: Not(req.currentUser.id) },
            status: filter,
          },
          relations: {
            projectOwner: true,
            requests: {
              freelancer: true,
            },
          },
        });

        if (Projects.length > 0) {
          res.send(Projects);
        } else {
          res.send({ message: `${filter} Projects Empty` });
        }
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
