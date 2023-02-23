import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/Users";

const scryptAsyc = promisify(scrypt);

export const register = async (req, res) => {
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

    const salt = randomBytes(8).toString("hex");
    const buf = (await scryptAsyc(password, salt, 64)) as Buffer;

    const User = new Users();
    User.name = name;
    User.password = `${buf.toString("hex")}.${salt}`;
    User.address = address;
    User.mobile_number = mobile_number;
    User.email_address = email_address;
    User.skills = skills.join(",");
    User.experience = experience;
    await AppDataSource.manager.save(User);

    const token = jwt.sign({ user: User }, process.env.JWT_KEY);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
