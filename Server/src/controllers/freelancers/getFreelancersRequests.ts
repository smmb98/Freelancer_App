import { AppDataSource } from "../../data-source";
import { Freelancers_Projects } from "../../entities/Freelancers_Projects";

export const getFreelancersRequests = async (req, res) => {
  try {
    const FreelancersRequestsRepository =
      AppDataSource.getRepository(Freelancers_Projects);

    const { filter } = req.query;

    if (filter === "none" || !filter) {
      const FreelancersRequests = await FreelancersRequestsRepository.find({
        where: {
          freelancer: { id: req.currentUser.id },
        },
        relations: {
          project: true,
          freelancer: true,
        },
      });

      if (FreelancersRequests.length > 0) {
        res.send(FreelancersRequests);
      } else {
        res.send({ message: "Projects Empty" });
      }
    } else {
      const FreelancersRequests = await FreelancersRequestsRepository.find({
        where: {
          freelancer: { id: req.currentUser.id },
          status: filter,
        },
        relations: {
          project: true,
          freelancer: true,
        },
      });

      if (FreelancersRequests.length > 0) {
        res.send(FreelancersRequests);
      } else {
        res.send({ message: `${filter} Projects Requests Empty` });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
