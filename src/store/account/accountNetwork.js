import HTTP from '../../lib/HTTP';

export async function fetchAccount() {
  try {
    const { id, username, createdAt, updatedAt } = await HTTP.get(`/v1/me`);

    return { data: { userId: id, username, createdAt, updatedAt }, error: null };
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
