export default function ({ app: { $axios } }) {
  $axios.defaults.baseURL = 'htto://localhost/3000'
}