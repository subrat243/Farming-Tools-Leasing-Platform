import { AuthCredentials } from '../types';

// Test credentials
const TEST_CREDENTIALS = {
  user: {
    email: 'user@example.com',
    password: 'user123',
    name: 'Test User'
  },
  admin: {
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User'
  }
};

export const authenticateUser = (credentials: AuthCredentials): Promise<{ name: string; email: string; role: 'user' | 'admin' }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.role === 'admin' && 
          credentials.email === TEST_CREDENTIALS.admin.email && 
          credentials.password === TEST_CREDENTIALS.admin.password) {
        resolve({
          name: TEST_CREDENTIALS.admin.name,
          email: TEST_CREDENTIALS.admin.email,
          role: 'admin'
        });
      } else if (credentials.role === 'user' && 
                credentials.email === TEST_CREDENTIALS.user.email && 
                credentials.password === TEST_CREDENTIALS.user.password) {
        resolve({
          name: TEST_CREDENTIALS.user.name,
          email: TEST_CREDENTIALS.user.email,
          role: 'user'
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};