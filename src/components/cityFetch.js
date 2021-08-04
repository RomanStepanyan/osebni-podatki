const baseUrl = 'https://jsonplaceholder.typicode.com/users';

export default async function fetchCityList() {
  return await fetch(baseUrl).then(res => res.json());
}
