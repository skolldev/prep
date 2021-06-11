import { NextSeo } from "next-seo";

import type { IFood } from "src/interfaces/food-interface";

type FoodDetailProps = {
  food: IFood;
};

export default function FoodDetail(props: FoodDetailProps): JSX.Element {
  return <NextSeo title={props.food.name} />;
}

FoodDetail.auth = true;
