import express from 'express';
import { User } from '@my-microservices/shared/src/entities/User';
import * as dotenv from 'dotenv';
import { AppDataSource } from './data-source';
import { authenticateJWT } from './authMiddleware';
import { arcjetMiddleware } from './arcjetMiddleware';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { authConfig } from './configs/auth.config';

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: envFile });

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(arcjetMiddleware);

app.get('/users/me', authenticateJWT, (req: any, res) => {
  res.json({ userId: req.userId, message: 'Authenticated!' });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const userId = user.id;

    const token = jwt.sign({ userId }, authConfig.jwtSecret, {
      expiresIn: authConfig.jwtExpiration,
    });

    res.json({ token });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");
    app.listen(port, () => {
      console.log(`User Service listening on port ${port}`);
    });
  })
  .catch((error: any) => console.log(error));
