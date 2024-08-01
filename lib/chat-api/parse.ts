export const getName = (str: string) => {
  try {
    const data = JSON.parse(str)
    return data?.name
  } catch (e) {
    const namePattern = /"name":\s*"([^"]+)"/i
    const nameMatch = str.match(namePattern)
    return nameMatch ? nameMatch[1] : undefined
  }
}

export const getContent = (str: string) => {
  try {
    const data = JSON.parse(str)
    return data?.content
  } catch (e) {
    const namePattern = /"content":\s*"([^"]+)"/i
    const nameMatch = str.match(namePattern)
    return nameMatch ? nameMatch[1] : undefined
  }
}

const checkStrBoolean = (str: string) => {
  if (str === 'True' || str === 'true' || str === '1') return true
  return false
}

export const getSuccess = (str: string) => {
  try {
    const data = JSON.parse(str)
    const booleanStr = data?.success
    return booleanStr ? checkStrBoolean(booleanStr) : false
  } catch (e) {
    return str.includes('True') || str.includes('true') || str.includes('1')
  }
}

export const getHintInfo = (str: string) => {
  try {
    const data = JSON.parse(str)
    return data?.content.success
  } catch (e) {
    const namePattern = /"info":\s*"([^"]+)"/i
    const nameMatch = str.match(namePattern)
    return nameMatch ? nameMatch[1] : undefined
  }
}

export const getHintExample = (str: string) => {
  try {
    const data = JSON.parse(str)
    return data?.content.example
  } catch (e) {
    const namePattern = /"example":\s*"([^"]+)"/i
    const nameMatch = str.match(namePattern)
    return nameMatch ? nameMatch[1] : undefined
  }
}

export const getMessage = (str: string) => {
  try {
    const data = JSON.parse(str)
    return data?.Message
  } catch (e) {
    const namePattern = /"Message":\s*"([^"]+)"/i
    const nameMatch = str.match(namePattern)
    return nameMatch ? nameMatch[1] : undefined
  }
}

interface expectedParsing {
  success: false
  Point: string
  summary: string
  good: string
  bad: string
  extra: string
}

export const getSummary = (str: string) => {
  try {
    const data = JSON.parse(str)
    return data?.summary
  } catch (e) {
    const namePattern = /"summary":\s*"([^"]+)"/i
    const nameMatch = str.match(namePattern)
    return nameMatch ? nameMatch[1] : undefined
  }
}

export const getParseFeedback = (str: string) => {
  try {
    const json = JSON.parse(str)
    return json as expectedParsing
  } catch (e) {
    const pointPattern = /"Point":\s*"([^"]+)"/i
    const pointMatch = str.match(pointPattern)
    const summaryPattern = /"summary":\s*"([^"]+)"/i
    const summaryMatch = str.match(summaryPattern)
    const goodPattern = /"good":\s*"([^"]+)"/i
    const goodMatch = str.match(goodPattern)
    const badPattern = /"bad":\s*"([^"]+)"/i
    const badMatch = str.match(badPattern)
    const extraPattern = /"extra":\s*"([^"]+)"/i
    const extraMatch = str.match(extraPattern)
    return {
      Point: pointMatch ? pointMatch[1] : undefined,
      summary: summaryMatch ? summaryMatch[1] : undefined,
      good: goodMatch ? goodMatch[1] : undefined,
      bad: badMatch ? badMatch[1] : undefined,
      extra: extraMatch ? extraMatch[1] : undefined
    }
  }
}

export const getSystem = (role: string) => {
  return role === 'system' || role === 'assistant'
}
