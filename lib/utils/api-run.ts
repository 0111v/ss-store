import { NextResponse } from "next/server"
import { z } from "zod"

export async function apiRun<T>(
  fn: () => Promise<T>
) {
  try {
    const data = await fn()
    return NextResponse.json(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400}
      )
    }
    return NextResponse.json(
      { error: 'Internal error' },
      { status: 500 }
    )
  }
}