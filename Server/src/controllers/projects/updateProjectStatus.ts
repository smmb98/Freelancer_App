import { Not } from "typeorm";
import { AppDataSource } from "../../data-source";
import {
  Freelancers_Projects,
  Status,
} from "../../entities/Freelancers_Projects";
import { Projects } from "../../entities/Projects";

export const updateProjectStatus = async (req, res) => {
  try {
    const { status, requestId } = req.body;

    const ProjectRepository = AppDataSource.getRepository(Projects);
    const Project = await ProjectRepository.findOneBy({
      id: req.params.id,
    });

    if (Project) {
      if (status === "assigned") {
        Project.status = status;
        ProjectRepository.save(Project);

        const FreelancerJobRepository =
          AppDataSource.getRepository(Freelancers_Projects);

        const AcceptedFreelancerRequest =
          await FreelancerJobRepository.findOneBy({
            projects: { id: req.params.id },
            id: requestId,
          });
        AcceptedFreelancerRequest.status = Status.WORKING;
        FreelancerJobRepository.save(AcceptedFreelancerRequest);

        const RejectedFreelancerRequest = await FreelancerJobRepository.find({
          where: { projects: { id: req.params.id }, id: Not(requestId) },
        });
        RejectedFreelancerRequest.forEach((element) => {
          element.rejectionReason = "Not Selected";
          element.status = Status.REJECTED;
          FreelancerJobRepository.save(element);
        });
        res.send(Project);
      } else if (status === "completed") {
        const FreelancerJobRepository =
          AppDataSource.getRepository(Freelancers_Projects);

        const CompletedFreelancerRequest =
          await FreelancerJobRepository.findOneBy({
            projects: { id: req.params.id },
            id: requestId,
          });

        if (CompletedFreelancerRequest.status === Status.COMPLETED) {
          Project.status = status;
          ProjectRepository.save(Project);
          CompletedFreelancerRequest.status = Status.VERIFIED;
          FreelancerJobRepository.save(CompletedFreelancerRequest);
          res.send(Project);
        } else {
          res
            .status(404)
            .send({ message: "Job not currently done by Freelancer" });
        }
      } else if (
        status === "rejected" &&
        Project.status.toString() !== "completed" &&
        Project.status.toString() !== "rejected"
      ) {
        const FreelancerJobRepository =
          AppDataSource.getRepository(Freelancers_Projects);

        const rejectedFreelancerRequest =
          await FreelancerJobRepository.findOneBy({
            projects: { id: req.params.id },
            id: requestId,
          });

        Project.status = status;
        Project.rejectionReason = "Rejected by Client";
        ProjectRepository.save(Project);
        rejectedFreelancerRequest.status = Status.REJECTED;
        rejectedFreelancerRequest.rejectionReason = "Rejected by Client";
        FreelancerJobRepository.save(rejectedFreelancerRequest);
        res.send(Project);
      }
    } else {
      res.status(404).send({ message: "Project not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
