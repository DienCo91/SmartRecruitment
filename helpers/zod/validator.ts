import z from 'zod/v3';

export class ValidatorZod {
  static password = z
    .string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message:
        'Password must be at least 8 chars, include uppercase, lowercase, number and special char',
    });
  static email = z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Invalid email address' });
}
