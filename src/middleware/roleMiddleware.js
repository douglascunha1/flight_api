export const onlyAdmin = async (c, next) => {
  const user = c.get('user');

  if (user.type !== 'admin') return c.json({ error: 'Acesso negado' }, 403);
  
  await next();
};
