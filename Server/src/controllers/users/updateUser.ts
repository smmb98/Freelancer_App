import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/Users";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
const scryptAsyc = promisify(scrypt);

export const updateUser = async (req, res) => {
  try {
    const {
      name,
      password,
      address,
      mobile_number,
      email_address,
      skills,
      experience,
    } = req.body;

    const UserRepository = AppDataSource.getRepository(Users);
    const User = await UserRepository.findOneBy({
      // id: req.currentUser.id,
      id: 1,
    });
    if (User) {
      const salt = randomBytes(8).toString("hex");
      const buf = (await scryptAsyc(password, salt, 64)) as Buffer;

      name ? (User.name = name) : null;
      password ? (User.password = `${buf.toString("hex")}.${salt}`) : null;
      address ? (User.address = address) : null;
      mobile_number ? (User.mobile_number = mobile_number) : null;
      email_address ? (User.email_address = email_address) : null;
      skills ? (User.skills = skills.join(",")) : null;
      experience ? (User.experience = experience) : null;
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
