// Simple role checking logic tests
describe('Role Authorization Logic', () => {
  const checkRole = (userRole: string, allowedRoles: string[]) => {
    return allowedRoles.includes(userRole);
  };

  it('should allow admin access to admin-only resources', () => {
    const userRole = 'ADMIN';
    const allowedRoles = ['ADMIN'];
    
    expect(checkRole(userRole, allowedRoles)).toBe(true);
  });

  it('should deny user access to admin-only resources', () => {
    const userRole = 'USER';
    const allowedRoles = ['ADMIN'];
    
    expect(checkRole(userRole, allowedRoles)).toBe(false);
  });

  it('should allow both roles access to general resources', () => {
    const adminRole = 'ADMIN';
    const userRole = 'USER';
    const allowedRoles = ['ADMIN', 'USER'];
    
    expect(checkRole(adminRole, allowedRoles)).toBe(true);
    expect(checkRole(userRole, allowedRoles)).toBe(true);
  });

  it('should handle empty allowed roles', () => {
    const userRole = 'USER';
    const allowedRoles: string[] = [];
    
    expect(checkRole(userRole, allowedRoles)).toBe(false);
  });
});