import { Table } from "@/components";
import { PlusIcon } from "@heroicons/react/outline";
import axios from "axios";
import { NextSeo } from "next-seo";
import { useQuery } from "react-query";
import prisma from "src/lib/db";

import type { Food } from "@prisma/client";
import type { GetStaticProps, InferGetStaticPropsType } from "next";

export const getStaticProps: GetStaticProps<{ foods: Food[] }> = async () => {
  return {
    props: { foods: await getData() },
  };
};

const getData = async (): Promise<Food[]> => {
  const { data } = await axios.get<Food[]>(
    `${process.env.NEXT_PUBLIC_URL}/api/foods`
  );
  return data;
};
export default function FoodsList(
  props: InferGetStaticPropsType<typeof getStaticProps>
): JSX.Element {
  const { data, isSuccess, isLoading } = useQuery("foods", getData, {
    initialData: props.foods,
  });

  return (
    <>
      <NextSeo title="Foods" />
      {isLoading && <span>Loading...</span>}
      {isSuccess && data && (
        <Table
          data={data}
          editAction={() => {
            return 0;
          }}
          displayColumns={["name", "calories", "protein", "fat", "carbs"]}
          uniqueCol="id"
        />
      )}
    </>
  );
}

FoodsList.auth = true;
FoodsList.pageTitle = "Foods";
