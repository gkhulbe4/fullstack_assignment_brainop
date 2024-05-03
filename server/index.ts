import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import bodyParser, { json } from "body-parser";
import dotenv from "dotenv";
import { db } from "./lib/db";
import { compare, hash } from "bcrypt";
import { Request, Response, NextFunction, Router } from "express";

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const SECRET = process.env.JWT_SECRET!;

const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  // TOKEN VERIFICATION
  const token = req.headers.authorization;
  if (token) {
    next();
  } else {
    console.log("no token");
    res.status(401).json({ error: "Unauthorized access" });
  }
};

app.get("/getusers", async (req, res) => {
  const allUsers = await db.user.findMany();
  return res.json({ message: "users", allUsers });
});

app.get("/user/me", verifyUser, async (req, res) => {
  res.json("Authorised");
});

app.post("/signup", async (req, res) => {
  const { name, username, email, password } = req.body;
  console.log(req.body);
  const hashedPass = await hash(password, 10);
  try {
    const existingUsername = await db.user.findUnique({
      where: { username: username },
    });

    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const existingEmail = await db.user.findUnique({
      where: { email: email },
    });

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const newUser = await db.user.create({
      data: {
        name: name,
        username: username,
        email: email,
        password: hashedPass,
      },
    });
    if (newUser) return res.status(200).json({ message: "User created" });
  } catch (error) {
    return res.status(500).json({ message: "An error occured", error });
  }
});

app.post("/signin", async (req, res) => {
  const { email, password, username } = req.body;
  console.log(req.body);
  try {
    const userExists = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!userExists) {
      return res
        .status(500)
        .json({ message: "Please create an account first" });
    }

    if (username !== userExists.username) {
      return res.status(400).json({ message: "Wrong username" });
    }

    const confirmPassword = await compare(password, userExists.password);
    if (!confirmPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
    return res
      .status(200)
      .json({ message: "Login Successful", token, userId: userExists.id });
  } catch (error) {
    return res.status(500).json({ message: "An error occured", error });
  }
});

app.get("/getposts", async (req, res) => {
  try {
    const posts = await db.post.findMany();
    return res.status(200).json({ posts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/user/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    res.status(500).json({ message: "User Not Found" });
  }
  return res.status(200).json({ message: "user found", user });
});

app.put("/resetpass/:userId", async (req, res) => {
  const userId = req.params.userId;
  const { oldPass, newPass } = req.body;
  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) return res.status(400).json({ message: "User not found" });
    const correctPass = await compare(oldPass, user.password);
    if (!correctPass)
      return res.status(400).json({ message: "Your old password isn't correct" });
    const hashedPass = await hash(newPass , 10)
    const updatePass = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPass,
      },
    });
    if (updatePass)
      return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "An internal error occurred" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
