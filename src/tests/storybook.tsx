/**
 * Checks if view mode of Storybook is "Docs" overview or Story directly
 * */
export const useIsDocs = () => {
  const location = window.location
  const params = new URLSearchParams(location.search)
  const viewMode = params.get('viewMode') ?? 'story'
  return viewMode === 'docs'
}
