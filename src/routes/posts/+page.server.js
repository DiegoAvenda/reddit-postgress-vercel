import prisma from '$lib/utils/prisma'

export const load = async () => {
  const posts = await prisma.post.findMany({
    include: { author: true, comments: true },
  })
  return { posts }
}

export const actions = {
  createPost: async ({ request, locals }) => {
    const data = await request.formData()
    const title = data.get('title')
    const content = data.get('content')

    await prisma.post.create({
      data: {
        title,
        content,
        author: { connect: { email: locals.user.email } },
      },
    })
  },
}
