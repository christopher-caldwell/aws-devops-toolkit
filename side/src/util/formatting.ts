export const kebabSplit = (kebabString: string): string[] => {
  return kebabString.split('-')
}

export const capitalizeWord = (wordToCapitalize: string): string => {
  return wordToCapitalize.charAt(0).toUpperCase() + wordToCapitalize.slice(1)
}

export const splitAndCapKebab = (kebabString: string, joinChar = ''): string => {
  const splitKebab = kebabSplit(kebabString)
  const cappedKebabs = splitKebab.map(capitalizeWord)
  return cappedKebabs.join(joinChar)
}
