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
  res.json(`register now `);
}

/** POST: http://localhost:8080/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/

export async function login(req, res) {
  res.json(`login route `);
}

/** GET: http://localhost:8080/api/user/example123 */
export async function getUser(req, res) {
  res.json(`getuser route `);
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
