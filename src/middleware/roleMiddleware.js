export const onlyAdmin = async (c, next) => {
  const user = c.get('user');

  if (user.type !== 'admin') return c.json({ error: 'Acess denied: you need to be an admin.' }, 403);
  
  await next();
};
