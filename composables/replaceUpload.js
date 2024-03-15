export function useReplaceUploads(str) {
  const runtimeConfig = useRuntimeConfig()
  return str.replace(/\/uploads/gi, `${runtimeConfig.public.api}/uploads`)
}