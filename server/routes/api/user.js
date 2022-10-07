import express from "express";
import bycrypt from "bcryptjs";

import jwt from "jsonwebtoken";

// Model
import User from "../../models/user";
import config from "../../config/index";

const router = express.Router();
const { JWT_SECRET } = config;

// NOTE: @routes Get api/user
// NOTE: @desc Get all user
// NOTE: @access public
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    if (!users) throw Error("No users");
    res.status(200).json(users);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
});

// NOTE: @routes Post api/user
// NOTE: @desc Register user
// NOTE: @access public
router.post("/", async (req, res) => {
  console.log(req);
  const { name, email, password } = req.body;

  //Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "모든 필드를 채워주세요." });
  }

  // Check for existing user
  User.findOne({ email }).then((user) => {
    if (user)
      return res.status(400).json({ msg: "이미 가입된 유저가 존재합니다." });

    const newUser = new User({
      name,
      email,
      password,
    });

    // NOTE: Hashing password
    // STEP 1: genSalt (2의배수, (salt) =>{})
    // STEP 2: hash (해시 처리해야 하는 데이터, hash된 값 (hash) =>{})
    // STEP 3: 결과 처리 1) newUser 변수의 password에 hash된 결과 값 넣기
    // STEP 4: 결과 처리 2)

    bycrypt.genSalt(10, (err, salt) => {
      bycrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          // webtoken에 등록, 만기일(단위 초 / 10h / 10d)
          jwt.sign(
            {
              id: user.id,
            },
            JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              });
            }
          );
        });
      });
    });
  });
});

export default router;
