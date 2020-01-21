import Category from "../models/Category";
import EONEVAPIOptions from "./eonevapioptions";
import Event from "../models/Event";

export default class EONEVAPI {
  private static baseUrl = "http://localhost:5000/";

  static async getCategories(): Promise<Array<Category>> {
    var result = await fetch(this.baseUrl + "category", {
      method: "GET"
    });
    var jsonString = await result.json();
    return jsonString as Array<Category>;
  }

  static async getEvents(options: EONEVAPIOptions): Promise<Array<Event>> {
    var finalUrl = this.baseUrl + "events?";
    if (options.from !== undefined)
      finalUrl += "from=" + options.from.toDateString();
    if (options.to !== undefined)
      finalUrl += finalUrl.endsWith("?")
        ? "to=" + options.to.toDateString()
        : "&to=" + options.to.toDateString();
    if (options.status !== undefined)
      finalUrl += finalUrl.endsWith("?")
        ? "status=" + options.status
        : "&status=" + options.status;
    if (options.category !== undefined)
      finalUrl += finalUrl.endsWith("?")
        ? "category=" + options.category
        : "&category=" + options.category;
    if (options.orderby !== undefined)
      finalUrl += finalUrl.endsWith("?")
        ? "orderby=" + options.orderby
        : "&orderby=" + options.orderby;
    if (finalUrl.endsWith("?"))
      finalUrl = finalUrl.substr(0, finalUrl.length - 1);

    var result = await fetch(finalUrl, { method: "GET" });
    var jsonString = await result.json();
    return jsonString as Array<Event>;
  }
}
