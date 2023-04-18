import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true })

  const { role } = request.user
  const token = await reply.jwtSign(
    { role }, // payload
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )

  const refreshToken = await reply.jwtSign(
    { role }, // payload
    {
      sign: {
        sub: request.user.sub,
        expiresIn: '7d',
      },
    },
  )

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true, // define q o cookie vai ser encryptado através do https, frontend não consegue ler a informação como um valor bruto
      sameSite: true, // só é acessível dentro do msm domínio
      httpOnly: true, // só é acessado pelo backend
    })
    .status(200)
    .send({ token })
}
