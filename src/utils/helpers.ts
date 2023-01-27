import path from 'path';

export const getProjectRoot = () => {
  return path.dirname(require?.main?.filename || '');
};
