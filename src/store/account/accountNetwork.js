import HTTP from '../../lib/HTTP';

export async function fetchAccount() {
  try {
    const { id, username, createdAt, updatedAt, telegramId } = await HTTP.get(`/v1/me`);

    return { data: { userId: id, username, createdAt, updatedAt, telegramId }, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function deleteAccount() {
  try {
    await HTTP.delete(`/v1/me`);

    return { data: { success: true }, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error };
  }
}

export async function addTelegramId(chatId) {
  try {
    const { id, username, createdAt, updatedAt, telegramId } = await HTTP.put(
      `/v1/me/telegram-id`,
      { telegramId: chatId }
    );

    return { data: { userId: id, username, createdAt, updatedAt, telegramId }, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error };
  }
}
