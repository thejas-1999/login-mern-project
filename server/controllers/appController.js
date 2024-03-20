import UserModel from "../model/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENV from "../config.js";

//middleware for verify the user
export async function verifyUser(req, res, next) {
  try {
    let username;
    // Determine whether the request method is GET or not
    if (req.method === "GET") {
      username = req.query.username; // Use req.query.username for GET requests
    } else {
      username = req.body.username; // Use req.body.username for other request methods
    }

    // Check if the user exists
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    // Pass user data to the next middleware or route handler
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
}

/** POST: http://localhost:8080/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/
export async function register(req, res) {
  try {
    const { username, password, profile, email } = req.body;

    // check the existing user
    const existUsername = UserModel.findOne({ username }).exec();
    const existEmail = UserModel.findOne({ email }).exec();

    Promise.all([existUsername, existEmail])
      .then(([existingUser, existingEmail]) => {
        if (existingUser) {
          throw { error: "Please use a unique username" };
        }
        if (existingEmail) {
          throw { error: "Please use a unique email" };
        }

        if (password) {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              const user = new UserModel({
                username,
                password: hashedPassword,
                profile: profile || "",
                email,
              });

              user
                .save()
                .then(() =>
                  res.status(201).send({ msg: "User Registered Successfully" })
                )
                .catch((error) => res.status(500).send({ error }));
            })
            .catch(() => {
              throw { error: "Unable to hash password" };
            });
        }
      })
      .catch((error) => {
        res.status(500).send({ error });
      });
  } catch (error) {
    res.status(500).send({ error });
  }
}
/** POST: http://localhost:8080/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/
export async function login(req, res) {
  const { username, password } = req.body;
  try {
    UserModel.findOne({ username })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ error: "Username not Found" });
        }
        bcrypt
          .compare(password, user.password)
          .then((passwordCheck) => {
            if (!passwordCheck)
              return res.status(400).send({ error: "Password does not Match" });
            //jwt token
            const token = jwt.sign(
              {
                userId: user._id,
                username: user.username,
              },
              ENV.JWT_SECRET,
              { expiresIn: "24h" }
            );
            return res.status(200).send({
              msg: "Login Successful...!",
              username: user.username,
              token,
            });
          })
          .catch((error) => {
            return res.status(500).send({ error: "Error comparing passwords" });
          });
      })
      .catch((error) => {
        return res.status(500).send({ error: "Error finding user" });
      });
  } catch (error) {
    return res.status(500).send({ error });
  }
}

/** GET: http://localhost:8080/api/user/example123 */
export async function getUser(req, res) {
  const { username } = req.params;

  try {
    if (!username) {
      return res.status(400).send({ error: "Invalid Username" });
    }

    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    /** remove password from user */
    // mongoose return unnecessary data with object so convert it into json
    const { password, ...rest } = Object.assign({}, user.toJSON());

    return res.status(200).send(rest);
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
}
/** PUT: http://localhost:8080/api/updateuser */
export async function updateUser(req, res) {
  res.json(`updateuser route `);
}

/** GET: http://localhost:8080/api/generateOTP */
export async function generateOTP(req, res) {
  res.json(`generateOTP route `);
}

/** GET: http://localhost:8080/api/verifyOTP */
export async function verifyOTP(req, res) {
  res.json(`verifyOTP route `);
}

/** GET: http://localhost:8080/api/createResetSession */
export async function createResetSession(req, res) {
  res.json(`createResetSession route `);
}

/** PUT: http://localhost:8080/api/resetPassword */
export async function resetPassword(req, res) {
  res.json(`resetPassword route `);
}
