import  axios from "axios";

//экземпляр с базовым URL для дальнейшего использования. Если надо - в этом файле делаются такие экземпляры на другие бэкэнды
export const instance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com/',
});