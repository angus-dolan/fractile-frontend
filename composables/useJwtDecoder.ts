function parseJwt(token: string) {
  if (!token) {
    return null;
  }

  const segments = token.split(".");

  if (segments.length !== 3) {
    return null;
  }

  try {
    const base64Url = segments[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const rawPayload = window.atob(base64);
    const jsonPayload = decodePayload(rawPayload);

    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

function decodePayload(rawPayload: string) {
  return decodeURIComponent(
    rawPayload
      .split("")
      .map((char) => "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2))
      .join(""),
  );
}

export default function (token: string = "") {
  const decoded = parseJwt(token);

  const isValid = decoded !== null && decoded.exp * 1000 > Date.now();

  return {
    isValid, // true or false based on the token's expiration
    payload: decoded, // the decoded payload or null
  };
}
