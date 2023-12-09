import prisma from '$lib/utils/prisma'

export const load = async ({ params }) => {
  const comments = await prisma.post.findUnique({
    where: { id: params.slug },
    include: {
      comments: {
        where: { parentId: null },
        include: { children: { include: { children: true } } },
      },
    },
  })
  return { comments }
}

export const actions = {
  commentPost: async ({ locals, request, params }) => {
    const data = await request.formData()
    const message = data.get('message')

    await prisma.comment.create({
      data: {
        message,
        post: { connect: { id: params.slug } },
        user: { connect: { email: locals.user.email } },
      },
    })
  },
  commentComment: async ({ locals, request, params }) => {
    const data = await request.formData()
    const message = data.get('message')
    const parentId = data.get('parentId')

    await prisma.comment.create({
      data: {
        message,
        parent: { connect: { id: parentId } },
        post: { connect: { id: params.slug } },
        user: { connect: { email: locals.user.email } },
      },
    })
  },
}
