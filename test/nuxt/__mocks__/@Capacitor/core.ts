export const CapacitorHttp = {
  async get(options: { url: string }): Promise<{ data: string | null, status: number }> {
    return { data: null, status: 200 }
  }
}