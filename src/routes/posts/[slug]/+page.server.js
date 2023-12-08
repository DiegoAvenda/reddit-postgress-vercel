import prisma from '$lib/utils/prisma'

export const load = async ({ params }) => {
  const comments = await prisma.post.findUnique({
    where: { id: params.slug },
    include: { comments: true },
  })
  return { comments }
}

export const actions = {
  commentPost: async (event, request, params) => {
    const data = request.formData()
    const message = data.get('postComment')
    const postId = params.slug

    await prisma.comment.create({
      data: {
        postId,
        message,
        user: {},
      },
    })
  },
}
