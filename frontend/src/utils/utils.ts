export const getInitials = (fullName: string): string => {
  const name = fullName.split(' ');
  const firstName = name[0];
  const lastName = name[1];
  return `${firstName[0]}${lastName[0]}`;
};
