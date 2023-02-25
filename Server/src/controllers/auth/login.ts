import jwt from "jsonwebtoken";
import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/Users";
import { scrypt } from "crypto";
import { promisify } from "util";

const scryptAsyc = promisify(scrypt);

export const login = async (req, res) => {
  try {
    const { email_address, password } = req.body;

    const UserRepository = AppDataSource.getRepository(Users);
    const User = await UserRepository.findOneBy({
      email_address: email_address,
    });
    if (User) {
      const [hashedPassord, salt] = User.password.split(".");

      const buf = (await scryptAsyc(password, salt, 64)) as Buffer;

      if (buf.toString("hex") === hashedPassord) {
        const token = jwt.sign({ user: User }, process.env.JWT_KEY);

        res.json({ token });
      } else {
        res.status(404).send({ message: "Invalid credentials" });
      }
    } else {
      res.status(404).send({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
