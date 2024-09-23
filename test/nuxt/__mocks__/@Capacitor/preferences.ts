export const Preferences = {
  async get(data: { key: string }): Promise<{ value: string | null }> {
    return { value: null };
  },

  async set(data: { key: string; value: string }): Promise<void> {}
}