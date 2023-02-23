export const logout = async (req, res) => {
  try {
    res.send({ message: "Logged out" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
