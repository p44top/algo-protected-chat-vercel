import { getStartPrompt } from '@/lib/chat-api/getStartPrompt'
import { nanoid } from '@/lib/utils'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'

export const runtime = 'edge'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

export async function POST(req: Request) {
  const json = await req.json()
  const { id = nanoid(), messages = [], category = '1', user } = json

  const res = await openai.createChatCompletion({
    model: 'gpt-4-turbo',
    messages: [
      {
        id: nanoid(),
        role: 'user',
        content: getStartPrompt(category, user)
      },
      ...messages
    ],
    temperature: 0.6,
    stream: true
  })

  const stream = OpenAIStream(res, {
    async onCompletion(completion) {
      const title = messages[0]?.content.substring(0, 100)
      const createdAt = Date.now()
      const path = `/${id}`
      const payload = {
        id,
        title,
        createdAt,
        path,
        messages
      }
    }
  })

  return new StreamingTextResponse(stream)
}
