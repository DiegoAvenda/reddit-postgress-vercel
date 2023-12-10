import prisma from '$lib/utils/prisma'
import { fail, redirect } from '@sveltejs/kit'

export const load = async () => {
  const posts = await prisma.post.findMany({
    include: { author: true, comments: true },
  })
  return { posts }
}

export const actions = {
  createPost: async ({ request, locals }) => {
    if (!locals.user) {
      throw redirect(303, '/signup')
    }

    const data = await request.formData()
    const title = data.get('title')
    const content = data.get('content')

    if (
      typeof title !== 'string' ||
      typeof content != 'string' ||
      !title ||
      !content
    ) {
      return fail(400, { invalid: true })
    }

    await prisma.post.create({
      data: {
        title,
        content,
        author: { connect: { email: locals.user.email } },
      },
    })

    return { succes: true }
  },
}
