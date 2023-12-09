import prisma from '$lib/utils/prisma'

export const load = async ({ params }) => {
  const comments = await prisma.post.findUnique({
    where: { id: params.slug },
    include: {
      comments: {
        where: { parentId: null },
        include: {
          children: {
            include: {
              children: { include: { likes: true, user: true } },
              likes: true,
              user: true,
            },
          },
          likes: true,
          user: true,
        },
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
  like: async ({ locals, request }) => {
    const data = await request.formData()
    const commentId = data.get('parentId')
    try {
      await prisma.like.create({
        data: {
          user: { connect: { email: locals.user.email } },
          comment: { connect: { id: commentId } },
        },
      })
    } catch (error) {
      console.error(error)
    }
  },
  dislike: async ({ request }) => {
    const data = await request.formData()
    const commentId = data.get('parentId')
    const userId = data.get('userId')
    try {
      await prisma.like.delete({
        where: { userId_commentId: { userId, commentId } },
      })
    } catch (error) {
      console.log(error)
    }
  },
  editComment: async ({ locals, request }) => {
    const data = await request.formData()
    const id = data.get('parentId')
    const email = data.get('userEmail')
    const editedText = data.get('editedText')

    if (locals.user.email === email) {
      await prisma.comment.update({
        where: { id },
        data: {
          message: editedText,
        },
      })
    }
  },
}
