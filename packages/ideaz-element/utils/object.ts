interface AnyObject {
  [key: string]: any
}

export function extractEvents(obj: AnyObject): AnyObject {
  const eventFields = Object.keys(obj).filter(key => /^on[A-Z]/.test(key))

  const newObj: AnyObject = {}
  for (const field of eventFields)
    newObj[field] = obj[field]

  return newObj
}
