require('dotenv').config()
import fetch from 'node-fetch'
const ZONE_ID = process.env.CLOUDFLARE_ZONE_ID
const baseURL = `https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/purge_cache`
let options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-Auth-Email': 'itsfish@fershad.com',
        'X-Auth-Key': `${process.env.CLOUDFLARE_API_KEY}`,
    }
  }

  const allLabels = "https://dewenbao.com/api/label/eng, https://dewenbao.com/api/label/fr, https://dewenbao.com/api/label/ja, https://dewenbao.com/api/label/tr, https://dewenbao.com/api/label/zh-hans, https://dewenbao.com/api/label/zh-hant, https://dewenbao.com/api/label/vi"
  const allHomepageStories = "https://dewenbao.com/api/story/preview/eng/0, https://dewenbao.com/api/story/preview/fr/0, https://dewenbao.com/api/story/preview/ja/0, https://dewenbao.com/api/story/preview/tr/0, https://dewenbao.com/api/story/preview/zh-hans/0, https://dewenbao.com/api/story/preview/zh-hant/0, https://dewenbao.com/api/story/preview/vi/0"

export const purgeLabels = async (inputs) => {
    const all = inputs.language === 'all' ? true : false
    const url = !all ? `https://dewenbao.com/api/label/${inputs.language}` : allLabels
    const urls = url.split(',')
    
    
    const data = {
        "files": urls.map(el => {return el.trim()})
    }

    options = {
        ...options,
        body: JSON.stringify(data),
    }

      const resp = await fetch(baseURL, options)
      const result = await resp.json()

      console.log(result)
      return result
}

export const purgeHomepageStories = async () => {
    const url = allHomepageStories
    const urls = url.split(',')
    
    
    const data = {
        "files": urls.map(el => {return el.trim()})
    }

    options = {
        ...options,
        body: JSON.stringify(data),
    }

      const resp = await fetch(baseURL, options)
      const result = await resp.json()

      console.log(result)
      return result
}

export const purgeEverything = async () => {
    const data = {
        "purge_everything":true
    }

    options = {
        ...options,
        body: JSON.stringify(data),
    }

      const resp = await fetch(baseURL, options)
      const result = await resp.json()

      console.log(result)
      return result
}


export const purgeWords = async (inputs) => {
    const urls = inputs.urls.split(',')

    const data = {
        "files": urls.map(el => {return el.trim()})
    }

    options = {
        ...options,
        body: JSON.stringify(data),
    }

      const resp = await fetch(baseURL, options)
      const result = await resp.json()

      console.log(result)
      return result
}