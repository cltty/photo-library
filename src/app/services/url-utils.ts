const BASE_URL: string = 'https://picsum.photos';
export const URL_PHOTOS_LIST = (page: number, limit: number) => `${BASE_URL}/v2/list?page=${page}&limit=${limit}`;