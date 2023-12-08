import prisma from '$lib/utils/prisma'

export async function handle({ event, resolve }) {
  const session = event.cookies.get('session')

  if (!session) {
    //if there is no session load page as normal
    return await resolve(event)
  }

  const user = await prisma.user.findUnique({
    where: { userAuthToken: session },
    select: { email: true, name: true, id: true, image: true },
  })

  if (user) {
    event.locals.user = {
      email: user.email,
      name: user.name,
      image: user.image,
    }
  }
  return await resolve(event)
}
