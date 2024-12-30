import { PublicAxios } from "./axiosHandler";
class ProductService {
  static endPoint = "products";
  static getAll() {
    return PublicAxios.get(`${ProductService.endPoint}`);
  }
  static getLimitedProducts(count) {
    return PublicAxios.get(`${ProductService.endPoint}?limit=${count}`);
  }
  static getSortedProducts(type) {
    return PublicAxios.get(`${ProductService.endPoint}?sort=${type}`);
  }

  // static post(data) {
  //     return PublicAxios.post(/ ${ProductService.endPoint}, data)
  // }
}
export default ProductService;
