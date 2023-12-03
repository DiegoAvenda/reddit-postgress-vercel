import { redirect } from '@sveltejs/kit'
import { OAuth2Client } from 'google-auth-library'
import { SECRET_CLIENT_ID, SECRET_CLIENT_SECRET } from '$env/static/private'
import prisma from '$lib/utils/prisma'

async function getUserData(access_token, setUserAuthToken) {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  )
  const data = await response.json()

  const usuario = await prisma.user.upsert({
    where: { email: data.email },
    update: { userAuthToken: setUserAuthToken },
    create: {
      email: data.email,
      userAuthToken: setUserAuthToken,
      name: data.given_name,
      image: data.picture,
    },
  })
}

export const GET = async ({ url, cookies }) => {
  const code = await url.searchParams.get('code')
  try {
    const oAuth2Client = new OAuth2Client(
      SECRET_CLIENT_ID,
      SECRET_CLIENT_SECRET,
      'http://localhost:5173/oauth'
    )
    const resp = await oAuth2Client.getToken(code)
    oAuth2Client.setCredentials(resp.tokens)
    const user = oAuth2Client.credentials

    let setUserAuthToken = crypto.randomUUID()

    cookies.set('session', setUserAuthToken, {
      maxAge: 60 * 60 * 24 * 5 * 1000, //5 days
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })

    await getUserData(user.access_token, setUserAuthToken)
  } catch (err) {
    console.log('Error logging in with OAuth2 user', err)
  }

  throw redirect(303, '/bio')
}
