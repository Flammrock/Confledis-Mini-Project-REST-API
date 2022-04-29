import { useParams } from "react-router-dom";
import ProductComponent from "../components/productComponent";

const ProductPage = () => {
  const { id } = useParams();

  return <ProductComponent id={Number(id)}></ProductComponent>;
};

export default ProductPage;
