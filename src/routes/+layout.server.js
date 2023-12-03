export const load = async (event) => {
  let fotos
  if (event.locals.user) {
    fotos = event.locals.user.picture
  } else {
    fotos =
      'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
  }
  return { fotos }
}
