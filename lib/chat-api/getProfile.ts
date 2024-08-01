const profileDir: Record<string, string[]> = {
  '1': [1, 2, 3, 4].map(val => `/profile/friends/${val}.png`),
  '2': [1, 2, 3].map(val => `/profile/formal/${val}.png`),
  '3': [1, 2, 3].map(val => `/profile/formal/${val}.png`),
  '4': [1, 2, 3, 4].map(val => `/profile/extra/${val}.png`)
}

export const getRandomProfile = (category: string) => {
  const list = profileDir[category] || profileDir['4']
  const randomIdx = Math.floor(Math.random() * list.length)
  return list[randomIdx]
}
