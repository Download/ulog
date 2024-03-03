export default {
  get: (name: string): string | null | undefined => {
    // try localstorage
    if (localStorage.getItem(name)) {
      return localStorage.getItem(name)
    }

    // try querystrinq
    const params = new URLSearchParams(location.search);
    if (params.get(name)) {
      return params.get(name)
    }
  }
}
