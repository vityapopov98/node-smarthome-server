import fs from "fs";
// import { getConfig } from './config';
import { userAPI } from "../../routes/docapi.js";
// import { sessions } from "../../routes.js";
const homeConfig = JSON.parse(fs.readFileSync("./config.json", "utf8"));
const sessions = [];
function auth(req, res) {
  const { login, password } = req.body;
  const links = userAPI("get");
  let userFound = false;
  homeConfig.users.forEach((user) => {
    if (!userFound) {
      if (user.login === login && user.password === password) {
        const sessionToken =
          user.role == "admin" ? "ADMIN" + Math.random() : Math.random();
        sessions.push(sessionToken);
        userFound = true;
        res.json({ status: "ok", token: sessionToken, links });
      }
    }
  });
  if (!userFound) res.json({ status: "user not found", links });
}
function getUsers(req, res) {
  // console.log('config:', getConfig)
  const links = userAPI("get");
  //Возвращать если запрашивает админ
  res.json({ users: homeConfig.users, links });
}

function postUsers(req, res) {
  const links = userAPI("post");
  if (req.body.login !== "" && req.body.password !== "") {
    const newUser = {
      name: req.body.name || "default",
      role: req.body.role || "user",
      login: req.body.login || "",
      password: req.body.password || "",
    };
    homeConfig.users.push(newUser);
    fs.writeFile("./config.json", JSON.stringify(homeConfig), (err) => {
      console.log(JSON.stringify(homeConfig));
      console.log(err);
      res.json({ status: 200, links });
    });
  } else {
    res.json({ status: "Error: empty login and passord", links });
  }
}

function putUsers(req, res) {
  const links = userAPI("put")._links;
}

function deleteUsers(req, res) {
  const links = userAPI("delete")._links;
}

export { getUsers, postUsers, putUsers, deleteUsers, auth };
