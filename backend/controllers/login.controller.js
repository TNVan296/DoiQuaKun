const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const users = []
const secretKey = 'mlt-u-090807'

const register =  async (req, res) => {
  const { username, password } = req.body;

  // trường hợp user đã tồn tại hay chưa
  const userExists = users.find(user => user.username === username);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // mã hóa password
  const hashPassWord = await bcryptjs.hash(password, 10)

  // thêm user
  users.push({ username, password: hashPassWord })

  res.status(201).send({ message: 'User registered successfully !' })
}

const login = async (req, res) => {
  const { username, password } = req.body;
  
  // trường hợp username vs password viết tào lao
  if (!username || !password) {
    return res.status(400).send({ message: 'Invalid username or password' });
  }

  // trường hợp user đã tồn tại hay chưa
  const userExists = users.find(user => user.username === username);
  if (userExists) {
    const isMatch = await bcryptjs.compare(password, userExists.password)
    if (!isMatch) {
      return res.status(400).send({ message: 'Invalid username or password' })
    }

    // Tạo JWT
  const accessToken = jwt.sign({ username: userExists.username }, secretKey, { expiresIn: '1h' });

  res.json({ accessToken });
  } else {
    return res.status(400).send({ message: 'User not exist !' })
  }
}

const profileUser = (req, res) => {
  res.json({ user: req.user });
}

module.exports = { register, login, profileUser }