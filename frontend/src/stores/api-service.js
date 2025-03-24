import axios from "axios"

const host = 'https://partidosdefutboltelegram-811677630258.us-central1.run.app/api/'

const API_PARTIDOS = host + "partidos"

function llamadaAPI(method, body, path) {
  let config = {
    method: method ?? "get",
    maxBodyLength: Infinity,
    url: path,
    headers: {}
  }
  if (body) {
    (config.data = body), (config.headers["Content-Type"] = "application/json")
  }
  return axios.request(config)
}

export function cambiarHttpPorHttps(enlace) {
  return enlace.replace('http', 'https')
}

export function getPartidos() {
  return llamadaAPI("get", null, API_PARTIDOS)
}

export function postPartidos(data) {
  return llamadaAPI("post", data, API_PARTIDOS)
}

export function deleteEntidad(entidad) {
  console.log("En apiservice, antes de delete: ", entidad)
  return llamadaAPI("delete", null, cambiarHttpPorHttps(entidad))
}

export function putEntidad(entidad, data) {
  return llamadaAPI("put", data, cambiarHttpPorHttps(entidad))
}