import { jwtDecode } from 'jwt-decode';

export function parseJwt(token: string) {
  try {
    return jwtDecode(token);
  } catch (e) {
    console.error('Token 解码失败', e);
    return null;
  }
}
