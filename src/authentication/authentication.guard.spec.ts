import { AuthenticationGuard } from './authentication.guard';
import { JwtService } from '@nestjs/jwt';

describe('AuthenticationGuard', () => {
  let guard: AuthenticationGuard;

  beforeEach(() => {
    const mockJwtService: unknown = {
      verifyAsync: jest.fn(),
    };
    guard = new AuthenticationGuard(mockJwtService as JwtService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
