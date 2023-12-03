import { redirect } from '@sveltejs/kit'
import prisma from '$lib/utils/prisma'

export const load = async ({ locals }) => {
  if (!locals.user) {
    throw redirect(303, '/signup')
  }
  let userPosts = await prisma.user.findUnique({
    where: { email: locals.user.email },
    select: { name: true, posts: true },
  })
  return userPosts
}
