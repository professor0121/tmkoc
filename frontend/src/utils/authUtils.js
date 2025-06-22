// src/utils/authUtils.js

/**
 * Check if the user is logged in
 * @param {object} user
 * @returns {boolean}
 */
export const isLoggedIn = (user) => !!user?.role;

/**
 * Check if the user is an admin
 * @param {object} user
 * @returns {boolean}
 */
export const isAdmin = (user) => user?.role === 'admin';

/**
 * Check if the user is a normal user
 * @param {object} user
 * @returns {boolean}
 */
export const isUser = (user) => user?.role === 'user';

/**
 * Check if user has any of the allowed roles
 * @param {object} user
 * @param {string[]} roles
 * @returns {boolean}
 */
export const hasRole = (user, roles = []) => {
  if (!user || !user.role) return false;
  return roles.includes(user.role);
};
