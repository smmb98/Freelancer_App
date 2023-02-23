import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/Users";

export const updateUser = async (req, res) => {
  try {
    const { name, address, mobile_number, email_address, skills, experience } =
      req.body;

    const UserRepository = AppDataSource.getRepository(Users);
    const User = await UserRepository.findOneBy({
      id: req.currentUser.id,
    });
    if (User) {
      User.name = name;
      User.address = address;
      User.mobile_number = mobile_number;
      User.email_address = email_address;
      User.skills = skills.join(",");
      User.experience = experience;
      UserRepository.save(User);

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
