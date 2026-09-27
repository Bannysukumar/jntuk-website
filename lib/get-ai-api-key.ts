export async function getGeminiApiKey(): Promise<string | null> {
  const envKey = process.env.GEMINI_API_KEY;
  return (envKey && envKey.trim()) || null;
}
