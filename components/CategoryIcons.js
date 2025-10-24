import { Shirt, Package, Glasses, Watch, ShoppingBag } from "lucide-react-native";

export function CategoryIcon({ category, size = 24, color = "#111827" }) {
  const categoryLower = category.toLowerCase();
  const iconProps = { size, color };

  if (categoryLower.includes("top") || categoryLower.includes("shirt")) {
    return <Shirt {...iconProps} />;
  }
  if (categoryLower.includes("bottom") || categoryLower.includes("pant")) {
    return <Package {...iconProps} />;
  }
  if (categoryLower.includes("accessor")) {
    return <Watch {...iconProps} />;
  }
  if (categoryLower.includes("shoe")) {
    return <ShoppingBag {...iconProps} />;
  }
  if (categoryLower.includes("glass")) {
    return <Glasses {...iconProps} />;
  }

  return <Shirt {...iconProps} />;
}