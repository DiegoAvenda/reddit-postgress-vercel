import prisma from '$lib/utils/prisma'

export async function load() {
  const users = await prisma.user.findMany()

  return { users }
}

export const actions = {
  logout: async ({ locals, cookies }) => {
    cookies.delete('session')
    locals.user = null
  },
}
