import 'dotenv/config';
import app from './app';

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`🚀  test-moduler-server running on http://localhost:${PORT}`);
});
