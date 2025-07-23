export function handleError(res, error) {
  const status = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  console.error('❌ Error:', message);
  return res.status(status).json({ success: false, message });
}
