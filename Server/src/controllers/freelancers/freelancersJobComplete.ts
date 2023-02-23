import { AppDataSource } from "../../data-source";
import {
  Freelancers_Projects,
  Status,
} from "../../entities/Freelancers_Projects";

export const freelancersJobComplete = async (req, res) => {
  try {
    const FreelancerJobRepository =
      AppDataSource.getRepository(Freelancers_Projects);
    const FreelancerJob = await FreelancerJobRepository.findOneBy({
      id: req.params.id,
    });

    if (FreelancerJob && FreelancerJob.status === Status.WORKING) {
      FreelancerJob.status = Status.COMPLETED;
      FreelancerJobRepository.save(FreelancerJob);

      res.send(FreelancerJob);
    } else {
      res
        .status(404)
        .send({ message: "Illegal Conditions for complete status" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
