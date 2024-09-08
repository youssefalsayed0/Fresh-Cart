import axios from "axios";
import { useQuery } from "react-query";

export default function useAllCategories() {
  function fetchCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const res = useQuery({
    queryFn: fetchCategories,
    queryKey: "allCategories",
  });

  return res;
}
