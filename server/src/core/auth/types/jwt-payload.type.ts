export type JwtPayload = {
  sub: string;
};

export type JwtPayloadWithRt = JwtPayload & { refreshToken: string };
