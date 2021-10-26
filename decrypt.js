import crypto from 'crypto';

const decrypt = (arquivo) => {
  const algorithm = 'aes-128-cbc';
  const decipher = crypto.createDecipheriv(
    algorithm,
    process.env.SERVICE_ENCRYPTION_KEY,
    process.env.SERVICE_ENCRYPTION_IV
  );
  let decrypted = decipher.update(arquivo, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return (JSON.parse(decrypted))
}

export default decrypt