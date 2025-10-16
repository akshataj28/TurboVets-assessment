export type Role = 'ADMIN' | 'MANAGER' | 'USER';
export const RolesHierarchy: Record<Role, number> = {
  ADMIN: 3,
  MANAGER: 2,
  USER: 1,
};
