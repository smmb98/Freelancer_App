import { AppDataSource } from "../../data-source";
import { Freelancers_Projects } from "../../entities/Freelancers_Projects";
import { Projects } from "../../entities/Projects";

export const applyFreelanceJob = async (req, res) => {
  try {
    const { projectId } = req.body;

    const FreelancerJobRepository =
      AppDataSource.getRepository(Freelancers_Projects);

    const ProjectRepository = AppDataSource.getRepository(Projects);
    const doesProjectExist = await ProjectRepository.findOneBy({
      id: projectId,
    });
    const isProjectOwned = await ProjectRepository.findOneBy({
      projectOwner: { id: req.currentUser.id },
      id: projectId,
    });

    if (doesProjectExist && !isProjectOwned) {
      const isRequestAlreadyExist = await FreelancerJobRepository.findOneBy({
        freelancer: { id: req.currentUser.id },
        projects: { id: projectId },
      });

      if (!isRequestAlreadyExist) {
        const FreelancerJob = new Freelancers_Projects();

        FreelancerJob.freelancer = req.currentUser.id;
        FreelancerJob.projects = projectId;
        FreelancerJobRepository.save(FreelancerJob);

        res.send(FreelancerJob);
      } else {
        res.status(404).send({ message: "Already Applied to the Job" });
      }
    } else {
      res.status(404).send({ message: "Cannot apply to this project" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
