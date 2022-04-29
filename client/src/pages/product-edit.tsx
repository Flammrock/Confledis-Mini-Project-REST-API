import { useParams } from "react-router-dom";
import ProductComponent from "../components/productComponent";

const ProductEditPage = () => {
  const { id } = useParams();

  return <ProductComponent id={Number(id)} edit={true}></ProductComponent>;
};

export default ProductEditPage;
