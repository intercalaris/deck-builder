export const SECRET_JWT_KEY = 'adsf2378huffg$^Gjsgdsfgdkhgfj^*($U$$Jiohhsfkdada5677)45454&*&^%%^';

export const cookieConfig = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 // 1 hour
};