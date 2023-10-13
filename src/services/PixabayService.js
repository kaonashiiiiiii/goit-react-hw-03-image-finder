import { useHttp } from "hooks/http.hook";

const PixabayService = () => {
  const { loading, request, error, clearError } = useHttp()
  const _apiBase = 'https://pixabay.com/api/'
  const _apiKey = '40025638-0e05185563b3cbe783cea860e'
  const _defaultCompleteUrl = `${_apiBase}?key=${_apiKey}`

  /**
   * transform url with the query params values
   * @param {Array<Array>} paramsEntries 
   * @param {String} url 
   * @returns 
   */
  function transformUrlString (paramsEntries, url) {
    paramsEntries.forEach((item) => {
      let [key, value ] = item
      if (key === 'query') key = 'q'
      let strToInject = `${key}=${value}`
      url += `&${strToInject}`
    })
    return url
  }

  /**
   * inject query params into url
   * @param {Object} paramsObject 
   * @returns 
   */
  function injectQueryParamsIntoUrl (paramsObject={}) {
    let resultUrl = `${_defaultCompleteUrl}&image_type=photo&orientation=horizontal`
    const entries = Object.entries(paramsObject)
    if (entries) {
      resultUrl = 
      resultUrl = transformUrlString(entries, resultUrl)
    }
    return resultUrl
  }

  /**
   * transform data array into array of objects with only needed fields 
   * @param {Array} data 
   */
  function transformImageData (data) {
    return data.map(item => ({
      id: item.id,
      webformatURL: item.webformatURL,
      largeImageURL: item.largeImageURL
    }))
  }

  async function getImages (paramsObject) {
    const url = injectQueryParamsIntoUrl(paramsObject)
    const data = await request(url)
    return transformImageData(data.hits)
  }

  return {
    loading,
    error,
    clearError,
    getImages,
  }
}

export default PixabayService