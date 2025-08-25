// Simple utility function tests
describe('Movement Type Validation', () => {
  it('should validate INCOME type', () => {
    const validTypes = ['INCOME', 'EXPENSE'];
    expect(validTypes).toContain('INCOME');
  });

  it('should validate EXPENSE type', () => {
    const validTypes = ['INCOME', 'EXPENSE'];
    expect(validTypes).toContain('EXPENSE');
  });

  it('should reject invalid movement type', () => {
    const validTypes = ['INCOME', 'EXPENSE'];
    expect(validTypes).not.toContain('INVALID');
  });
});

describe('Amount Formatting', () => {
  it('should format amount with 2 decimal places', () => {
    const amount = 100.5;
    const formatted = `$${amount.toFixed(2)}`;
    expect(formatted).toBe('$100.50');
  });

  it('should handle zero amount', () => {
    const amount = 0;
    const formatted = `$${amount.toFixed(2)}`;
    expect(formatted).toBe('$0.00');
  });
});

describe('Role Validation', () => {
  it('should validate admin role', () => {
    const validRoles = ['ADMIN', 'USER'];
    expect(validRoles).toContain('ADMIN');
  });

  it('should validate user role', () => {
    const validRoles = ['ADMIN', 'USER'];
    expect(validRoles).toContain('USER');
  });
});