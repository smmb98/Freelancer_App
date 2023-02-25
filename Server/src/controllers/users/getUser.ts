import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/Users";

export const getUser = async (req, res) => {
  try {
    const UserRepository = AppDataSource.getRepository(Users);
    const User = await UserRepository.findOneBy({
      id: req.currentUser.id,
    });
    if (User) {
      const payload = {
        name: User.name,
        address: User.address,
        mobile_number: User.mobile_number,
        email_address: User.email_address,
        skills: User.skills.split(","),
        experience: User.experience,
      };
      res.send(payload);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
